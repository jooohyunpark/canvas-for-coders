"use client"

import { useActionState, useId } from "react"
import { useFormStatus } from "react-dom"
import { CircleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { verifyPassword, type VerifyState } from "./actions"

const initialState: VerifyState = { error: false }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="secondary" disabled={pending}>
      Submit
    </Button>
  )
}

export function PasswordForm({ redirectTo }: { redirectTo: string }) {
  const id = useId()
  const [state, formAction] = useActionState(verifyPassword, initialState)

  return (
    <form className="space-y-4" action={formAction}>
      <label htmlFor={id} className="block text-sm">
        This content is password-protected. Please enter the password to
        continue.
      </label>

      <input type="hidden" name="from" value={redirectTo} />

      <div className="flex gap-x-3">
        <input
          id={id}
          name="password"
          type="password"
          maxLength={128}
          aria-label="Password"
          placeholder="Password"
          autoComplete="current-password"
          autoFocus
          className={cn(
            "border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-8 max-w-60 flex-1 rounded-lg border px-2.5 text-sm outline-none focus-visible:ring-3"
          )}
        />
        <SubmitButton />
      </div>

      {state.error && (
        <div className="text-destructive flex items-center gap-x-2 text-sm">
          <CircleAlert className="size-4" />
          <span>Incorrect password</span>
        </div>
      )}
    </form>
  )
}
