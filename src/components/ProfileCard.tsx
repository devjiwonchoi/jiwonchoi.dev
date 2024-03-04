import Image from 'next/image'

export function ProfileCard() {
  return (
    <section className="flex flex-col items-center p-6">
      <Image
        alt="devjiwonchoi Logo"
        className="h-20 w-20"
        height={0}
        src="/me-logo.svg"
        width={0}
      />
      <h1 className="mb-4 text-4xl font-bold text-neutral-50 sm:text-4xl">
        Jiwon Choi
      </h1>
      <p className="uppercase tracking-widest text-neutral-50">
        software engineer
      </p>
    </section>
  )
}
