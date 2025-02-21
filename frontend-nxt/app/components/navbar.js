import React from 'react'
import Link from 'next/link'

const navbar = () => {
  return (
    <div>
        <header className="fixed top-0 w-full bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">
              <Link className="text-black text-3xl font" href="/">KeepFit</Link>
            </h1>
           
          </div>

          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
              <li><Link href="/about" className="text-gray-700 hover:text-blue-600">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
              <li><Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default navbar