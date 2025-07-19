'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for confirmation link')
      router.push('/signin')
    }
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold">Sign Up</h2>
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
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
    </form>
  )
}
