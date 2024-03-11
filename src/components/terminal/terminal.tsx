'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Terminal as XtermTerminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'
import type { ITerminalInitOnlyOptions, ITerminalOptions } from '@xterm/xterm'

const XtermTerminalOptions: ITerminalOptions & ITerminalInitOnlyOptions = {
  fontSize: 14,
  fontFamily: 'Geist Mono, monospace',
  // TODO: does this work?
  macOptionIsMeta: true,
  cursorBlink: true,
  rows: 25,
  tabStopWidth: 2,
  lineHeight: 1.25,
  theme: {
    background: '#141414',
    cursor: '#fafafa',
    black: '#0a0a0a',
    white: '#fafafa',
  },
}

const promptStr = `guest@jiwonchoi.dev ~ % `

const helpMessage = [
  '',
  'Available Commands:',
  '  clear  -  Clear the terminal screen',
  '  help   -  Show this help message',
  '  ls     -  List the files in the current directory',
  '  open   -  Open a file',
].join('\n\r')

const files = ['biography.php', 'blog.php', 'projects.php']

function registerOnData({
  terminal,
  runCommand,
  prompt,
  history,
  historyIndex,
  command,
}: {
  terminal: XtermTerminal
  runCommand: (text: string) => void
  prompt: (lineBreak?: boolean) => void
  history: string[]
  historyIndex: number
  command: string
}) {
  terminal.onData((e) => {
    switch (e) {
      case '\r': // Enter
        runCommand(command)
        history.push(command)
        historyIndex = history.length
        command = ''
        break
      case '\u007F': // Backspace (DEL)
        // Do not delete the prompt
        if (terminal.buffer.active.cursorX > promptStr.length) {
          terminal.write('\b \b')
          if (command.length > 0) {
            command = command.substring(0, command.length - 1)
          }
        }
        break
      // Tab
      case '\u0009':
        // tab completion
        const lastWord = command.split(' ').pop()

        if (lastWord) {
          const matchingCommands = files.filter((command) =>
            command.startsWith(lastWord),
          )

          if (matchingCommands.length === 1) {
            const completeCommand = matchingCommands[0].slice(lastWord.length)
            terminal.write(completeCommand)
            command += completeCommand
          }

          if (matchingCommands.length > 1) {
            terminal.writeln('')
            terminal.write(matchingCommands.join('    '))
            prompt()
            command = ''
          }
        }
        break
      // Left arrow
      case '\u001b[D':
        if (terminal.buffer.active.cursorX > promptStr.length) {
          terminal.write('\u001b[D')
        }
        break
      // Right arrow
      case '\u001b[C':
        if (
          command.length >
          terminal.buffer.active.cursorX - promptStr.length
        ) {
          terminal.write('\u001b[C')
        }
        break
      // Up arrow
      case '\u001b[A':
        if (historyIndex > 0) {
          // clear the current command first
          terminal.write(`\r${promptStr}${' '.repeat(command.length)}`)
          // preserve current index, then decrement
          historyIndex--
          command = history[historyIndex]
          terminal.write(`\r${promptStr}${command}`)
        }
        break
      // Down arrow
      case '\u001b[B':
        if (historyIndex < history.length - 1) {
          // clear the current command first
          terminal.write(`\r${promptStr}${' '.repeat(command.length)}`)
          historyIndex++
          command = history[historyIndex]
          terminal.write(`\r${promptStr}${command}`)
        }
        break
      default: // Print all other characters for demo
        if (
          (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7e)) ||
          e >= '\u00a0'
        ) {
          command += e
          terminal.write(e)
        }
    }
  })
}

function runCommand({
  terminal,
  text,
  prompt,
  commands,
}: {
  terminal: XtermTerminal
  text: string
  prompt: () => void
  commands: Record<string, any>
}) {
  const args = text.trim().split(' ')
  const command = args[0]
  const possiblyFile = args.slice(1)[0]

  if (command.length) {
    terminal.writeln('')

    if (command in commands) {
      return commands[command].f(possiblyFile)
    }

    terminal.write(`zsh: command not found: ${command}`)
  }
  prompt()
}

function getCommands({
  terminal,
  prompt,
  router,
}: {
  terminal: XtermTerminal
  prompt: (lineBreak?: boolean) => void
  router: ReturnType<typeof useRouter>
}) {
  const commands: Record<string, any> = {
    clear: {
      f: () => {
        // Reason why I don't use terminal.clear() or terminal.reset()
        // See https://github.com/xtermjs/xterm.js/issues/950#issuecomment-327624355
        terminal.write('\x1bc')
        prompt(false)
      },
    },
    help: {
      f: () => {
        terminal.writeln(helpMessage)
        prompt()
      },
    },
    ls: {
      f: () => {
        terminal.write(files.join('    '))
        prompt()
      },
    },
    open: {
      f: (file: string) => {
        if (files.includes(file)) {
          const path = file.replace('.php', '')
          return router.push(`/${path}`)
        }

        terminal.write(`The file "${file}" does not exist.`)
        prompt()
      },
    },
  }

  return commands
}

export function Terminal() {
  const router = useRouter()
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const terminal = new XtermTerminal(XtermTerminalOptions)
    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()
    terminal.loadAddon(fitAddon)
    terminal.loadAddon(webLinksAddon)
    fitAddon.fit()

    const prompt = (lineBreak = true) => {
      terminal.write(`\r${lineBreak ? '\n' : ''}${promptStr}`)
    }

    // command history
    const history: string[] = []
    const commands = getCommands({
      terminal,
      prompt: (lineBreak?: boolean) => prompt(lineBreak),
      router,
    })
    let historyIndex = 0
    let command = ''

    if (terminalRef.current) {
      registerOnData({
        terminal,
        runCommand: (text) => runCommand({ terminal, text, prompt, commands }),
        prompt,
        history,
        historyIndex,
        command,
      })
      terminal.open(terminalRef.current)
      terminal.focus()
      prompt(false)
    }

    return () => {
      terminal.dispose()
    }
  }, [router])

  return (
    <div className="flex justify-center">
      <div ref={terminalRef} />
    </div>
  )
}