'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard') // or wherever
    }
  }

  return (
    <form onSubmit={handleSignIn} className="space-y-4 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold">Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border"
      />
      <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2">
        {loading ? 'Loading...' : 'Sign In'}
      </button>
    </form>
  )
}
