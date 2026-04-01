'use client'
import { useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function TestPage() {
  const [status, setStatus] = useState('idle')
  const [info, setInfo] = useState('')

  const testAuth = async () => {
    setStatus('testing...')
    try {
      setInfo('Checking auth object: ' + (auth ? 'EXISTS' : 'NULL'))
      
      onAuthStateChanged(auth, (user) => {
        setInfo(prev => prev + '\nAuth state: ' + (user ? 'LOGGED IN as ' + user.email : 'NOT LOGGED IN'))
      })

      const result = await signInWithEmailAndPassword(auth, 'YOUR_TEST_EMAIL', 'YOUR_TEST_PASSWORD')
      setInfo(prev => prev + '\nSign in SUCCESS: ' + result.user.email)
      setStatus('done')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'unknown error'
      setInfo(prev => prev + '\nERROR: ' + msg)
      setStatus('error')
    }
  }

  return (
    <div style={{padding: '40px', color: 'white', background: '#080C14', minHeight: '100vh'}}>
      <h1>Firebase Test</h1>
      <p>API Key loaded: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'YES' : 'NO'}</p>
      <p>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'NOT LOADED'}</p>
      <p>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'NOT LOADED'}</p>
      <br />
      <button onClick={testAuth} style={{background:'#14B8A6', padding:'10px 20px', borderRadius:'8px', cursor:'pointer'}}>
        Test Firebase Auth
      </button>
      <br /><br />
      <p>Status: {status}</p>
      <pre style={{background:'#111', padding:'20px', borderRadius:'8px', whiteSpace:'pre-wrap'}}>{info}</pre>
    </div>
  )
}
