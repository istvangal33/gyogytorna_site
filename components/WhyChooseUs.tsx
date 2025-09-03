"use client";

import { motion } from "framer-motion";
import { Award, Clock, Heart, MapPin, PhoneCall, Star, Users, Zap } from "lucide-react";
import { useState } from "react";
import Tilt from "./Tilt"; 

const stats = [
  {
    number: "300+",
    label: "Sikeres kezelés",
    description: "Elégedett páciensek száma folyamatosan növekszik",
    icon: <Heart className="h-5 w-5" />,
    color: "#ef4444",
    gradient: "from-red-500 to-pink-500"
  },
  {
    number: "10+",
    label: "Év tapasztalat",
    description: "Gyógytornászat területén",
    icon: <Award className="h-5 w-5" />,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    number: "98%",
    label: "Elégedettség",
    description: "Pácienseink visszajelzései alapján",
    icon: <Star className="h-5 w-5" />,
    color: "#10b981",
    gradient: "from-emerald-500 to-green-500"
  },
  {
    number: "24/7",
    label: "Elérhetőség",
    description: "Sürgős esetekben",
    icon: <Clock className="h-5 w-5" />,
    color: "#3b82f6",
    gradient: "from-blue-500 to-cyan-500"
  }
];

const features = [
  {
    title: "Személyre szabott kezelés",
    description: "Minden pácienshez egyedi terápiás tervet készítünk, figyelembe véve az életstílust és célokat.",
    icon: <Users className="h-5 w-5" />,
    color: "#3b82f6",
    image: "🎯"
  },
  {
    title: "Modern eszközpark",
    description: "A legújabb rehabilitációs berendezések és technikák alkalmazása a gyors gyógyulásért.",
    icon: <Zap className="h-5 w-5" />,
    color: "#8b5cf6",
    image: "⚡"
  },
  {
    title: "Központi helyszín",
    description: "Könnyen megközelíthető rendelő a város szívében, parkolási lehetőséggel.",
    icon: <MapPin className="h-5 w-5" />,
    color: "#06b6d4",
    image: "📍"
  },
  {
    title: "Rugalmas időbeosztás",
    description: "Este és hétvégén is elérhető időpontok az Ön kényelmének megfelelően.",
    icon: <Clock className="h-5 w-5" />,
    color: "#f59e0b",
    image: "⏰"
  }
];

export default function WhyChooseUs() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-blue-200 text-gray-900 text-sm font-semibold rounded-full mb-4">
            Miért válassz engem?
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Több mint 10 éves tapasztalat
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            15 éves tapasztalattal segítem pácienseimet visszanyerni 
            mobilitásukat és életminőségüket.
          </p>
        </motion.div>

        {/* Stats Grid - Tilt Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Tilt options={{ max: 25, speed: 400, glare: true, "max-glare": 0.5 }}>
                <div
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl border border-white/20 text-center relative overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer group h-72 sm:h-64"
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  {/* Gradient Background on Hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                  />
                  
                  {/* Icon */}
                  <motion.div 
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg relative z-10`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1 
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-white drop-shadow-lg">
                      {stat.icon}
                    </div>
                  </motion.div>

                  {/* Number */}
                  <motion.div 
                    className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  {/* Label */}
                  <div className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                    {stat.description}
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 pointer-events-none"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Border Glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 20px ${stat.color}20, 0 0 20px ${stat.color}10`
                    }}
                  />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Features */}
          <div className="space-y-6">
            <motion.h3 
              className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Amit kínálunk Önnek
            </motion.h3>

            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
              >
                <div 
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  style={{ 
                    backgroundColor: `${feature.color}15`,
                    color: feature.color
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Profile Card with Tilt */}
          <motion.div 
            className="relative order-first lg:order-last"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            

            {/* Floating Badges */}
            

            
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-black to-gray-900 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-gray-900/80"></div>
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Kezdje el még ma a gyógyulás útját!
              </h3>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Foglaljon időpontot még ma, és tapasztalja meg a különbséget!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a 
                  href="/bemutatkozas"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ha jobban megismernél
                </motion.a>
                <motion.a 
                  href="tel:+36301234567"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneCall className="w-5 h-5" />
                  +36 30 123 4567
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}