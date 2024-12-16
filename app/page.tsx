'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Copy, FileUp } from 'lucide-react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [input, setInput] = useState('')
  const [solution, setSolution] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInput(content)
      }
      reader.readAsText(file)
    }
  }

  const handleSolve = () => {
    // Aquí iría la lógica real para generar la solución
    setSolution(`Solución para: ${input}`)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(solution)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <main className={`flex min-h-screen flex-col items-center p-8 ${darkMode ? 'dark' : ''} bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 transition-colors duration-500`}>
      <div className="z-10 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`${montserrat.className} text-4xl font-bold text-zinc-800 dark:text-zinc-100`}>
            ZincWriter
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>

        <div className="space-y-6 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
          <div className="space-y-2">
            <Label htmlFor="input" className="text-lg font-semibold">Entrada de datos</Label>
            <Textarea
              id="input"
              placeholder="Ingrese sus datos aquí o cargue un archivo"
              value={input}
              onChange={handleInputChange}
              className="min-h-[200px] bg-zinc-50 dark:bg-zinc-700"
            />
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
              >
                <FileUp className="mr-2 h-4 w-4" /> Cargar archivo
              </Button>
            </div>
          </div>

          <Button onClick={handleSolve} className="w-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300">
            Solucionar
          </Button>

          <div className="space-y-2">
            <Label htmlFor="solution" className="text-lg font-semibold">Solución</Label>
            <Textarea
              id="solution"
              value={solution}
              readOnly
              className="min-h-[200px] bg-zinc-50 dark:bg-zinc-700"
            />
            <Button 
              variant="outline" 
              onClick={handleCopy} 
              className="w-full bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
            >
              <Copy className="mr-2 h-4 w-4" /> Copiar solución
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

