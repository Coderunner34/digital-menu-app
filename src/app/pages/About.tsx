import { Heart, Users, Zap, Award, Clock, Leaf, Phone, ExternalLink, Star, Flame, Shield } from 'lucide-react';
import { getSettings } from '../../utils/storage';
import { useState } from 'react';

export function About() {
  const [settings] = useState(getSettings());

  const stats = [
    { number: '5,00+', label: 'Happy customers', icon: Users },
    { number: '15min', label: 'Avg. prep time', icon: Clock },
    { number: '4.9', label: 'Rating', icon: Star },
    { number: '50+', label: 'Daily fresh', icon: Leaf },
  ];

  const values = [
    { 
      icon: Flame, 
      title: 'Fresh daily', 
      desc: 'Chopped, marinated, grilled—same morning you eat.',
      color: 'text-orange-500'
    },
    { 
      icon: Leaf, 
      title: 'Local first', 
      desc: 'Tomatoes from Ngong. Avocados from Murang\'a.',
      color: 'text-green-600'
    },
    { 
      icon: Zap, 
      title: '15 min', 
      desc: 'Most orders out the door. No compromise.',
      color: 'text-yellow-500'
    },
    { 
      icon: Shield, 
      title: 'Guaranteed', 
      desc: 'Not happy? We fix it. No arguments.',
      color: 'text-blue-500'
    },
    { 
      icon: Heart, 
      title: 'Family recipes', 
      desc: 'Passed down, never frozen.',
      color: 'text-red-500'
    },
    { 
      icon: Award, 
      title: 'Event ready', 
      desc: '10 to 500 guests. We handle it.',
      color: 'text-purple-500'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      
      {/* HERO - Full bleed image with overlay */}
      <div className="relative h-[70vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2070&q=80"
            alt="Grilled chicken"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm text-white/90 mb-6">
              Kiambu Road • Since 2025
            </span>
            <h1 className="font-serif text-6xl md:text-7xl text-white leading-tight mb-4">
              Food that 
              <span className="text-orange-400 block">feels like home.</span>
            </h1>
            <p className="text-xl text-white/90 max-w-lg">
              Sizzling grilled chicken. Crispy fries. Cold drinks. 
              No shortcuts. Just honest food.
            </p>
          </div>
        </div>
      </div>

      {/* STATS BAR - Floating card */}
      <div className="relative -mt-16 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                  <div className="font-serif text-2xl text-gray-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STORY - Two column scan */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-wider text-orange-500 font-medium">
                Our story
              </span>
              <h2 className="font-serif text-4xl text-gray-900 dark:text-white mt-3 mb-6">
                Started on Kiambu Road.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                We wanted food that actually tastes like something. 
                Not reheated. Not frozen. Just real food, made fresh.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mt-4">
                First customer was skeptical. She came back the next day. 
                Brought her whole office.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
                alt="Grilled chicken"
                className="rounded-2xl aspect-square object-cover"
              />
              <img 
                src="https://t4.ftcdn.net/jpg/06/33/68/61/360_F_633686185_Vl6JmQ5iW8h23zECxdGAF0teV8sSsBre.jpg"
                alt="Cooking process"
                className="rounded-2xl aspect-square object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES - Clean grid, scannable */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm uppercase tracking-wider text-orange-500 font-medium">
              Why people come back
            </span>
            <h2 className="font-serif text-4xl text-gray-900 dark:text-white mt-3">
              Fresh. Fast. Fair.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-white dark:bg-[#0A0A0A] p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0`}>
                    <value.icon className={`w-5 h-5 ${value.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Clean, one action */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-gray-900 dark:text-white mb-4">
            Ready to eat?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Order now or talk to us about your event.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://bizwaziri-clean.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Bizwaziri
            </a>
            <a 
              href="tel:0792211741"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <Phone className="w-4 h-4" />
              0792 211 741
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            Emergency catering or tech issues? Call anytime.
          </p>
        </div>
      </section>
      
    </div>
  );
}