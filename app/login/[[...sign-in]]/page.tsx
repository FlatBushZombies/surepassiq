import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <SignIn />
        </div>
      </div>
      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
            Start learning today
          </h2>
          <p className="max-w-md text-lg text-primary-foreground/80">
            Join learners who are building skills with guided programs from our institution on Surepass IQ.
          </p>
        </div>
      </div>
    </div>
  )
}
