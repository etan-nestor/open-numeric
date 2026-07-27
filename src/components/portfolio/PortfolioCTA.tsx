'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function PortfolioCTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="p-12 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Un projet en tête ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discutons de votre besoin et trouvons ensemble la meilleure solution.
          </p>
          <Link
            href="/devis"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Demander un devis
          </Link>
        </motion.div>
      </div>
    </section>
  )
}