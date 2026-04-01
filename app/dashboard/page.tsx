'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Plus, Download, Eye, ChevronDown, X, AlertTriangle, CheckCircle, Clock, Loader2 } from 'lucide-react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const F = { fontFamily: "'Nunito', sans-serif" }

const mockAudits = [
  { id: '1', date: '2025-11-12', system: 'Epic MyChart Chatbot', score: 78, status: 'High Risk' },
  { id: '2', date: '2025-11-08', system: 'Nuance DAX Scribe', score: 34, status: 'Low Risk' },
  { id: '3', date: '2025-10-30', system: 'Custom EHR GPT Wrapper', score: 61, status: 'Medium Risk' },
]

const riskColor = (s: string) =>
  s === 'High Risk' ? 'text-red-400' :
  s === 'Medium Risk' ? 'text-yellow-400' : 'text-green-400'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBAA, setShowBAA] = useState(false)
  const [baaSigned, setBaaSigned] = useState(false)
  const [showNewAudit, setShowNewAudit] = useState(
