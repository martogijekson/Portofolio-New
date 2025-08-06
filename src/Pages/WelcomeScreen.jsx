import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User, Sparkles, Zap, Star } from "lucide-react";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        className="text-blue-400"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        |
      </motion.span>
    </span>
  );
};

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-400/40 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10,
          }}
          animate={{
            y: -10,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced background with animated gradients and particles
const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Main gradient backgrounds */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-indigo-800/30 to-purple-600/20"
      animate={{
        background: [
          "radial-gradient(circle at 20% 50%, rgba(139, 69, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)",
          "radial-gradient(circle at 80% 50%, rgba(139, 69, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)",
          "radial-gradient(circle at 50% 20%, rgba(139, 69, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)",
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
    />

    {/* Animated gradient orbs */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/12 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, -30, 0],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div
      className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-600/12 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.3, 1],
        x: [0, -40, 0],
        y: [0, 40, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />

    {/* Grid pattern overlay */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `radial-gradient(circle, #a855f7 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }}
    />

    <FloatingParticles />
  </div>
);

// Enhanced icon button with more animations
const IconButton = ({ Icon, delay = 0 }) => (
  <motion.div
    className="relative group cursor-pointer"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{
      duration: 0.8,
      delay,
      type: "spring",
      stiffness: 200,
      damping: 10,
    }}
    whileHover={{
      scale: 1.15,
      rotate: 5,
      transition: { duration: 0.3 },
    }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Glowing border effect */}
    <motion.div
      className="absolute -inset-3 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-600 rounded-full blur-lg opacity-30"
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    {/* Main button */}
    <div className="relative p-4 bg-gradient-to-br from-violet-900/50 to-indigo-900/50 backdrop-blur-sm rounded-full border border-violet-400/30 shadow-xl">
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-violet-200" />

      {/* Sparkle effect */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{
          rotate: [0, 360],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles className="w-3 h-3 text-violet-300" />
      </motion.div>
    </div>
  </motion.div>
);

// Enhanced text reveal animation
const AnimatedText = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      duration: 1,
      delay,
      type: "spring",
      stiffness: 100,
      damping: 10,
    }}
  >
    {children}
  </motion.div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 5000);

    // Show stars animation after 2 seconds
    const starsTimer = setTimeout(() => {
      setShowStars(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(starsTimer);
    };
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  // Stars decoration
  const StarField = () => (
    <AnimatePresence>
      {showStars && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Star className="w-2 h-2 text-violet-300/60" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={containerVariants}
        >
          <BackgroundEffect />
          <StarField />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto text-center">
              {/* Icons with staggered animation */}
              <motion.div
                className="flex justify-center gap-8 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[Code2, User, Github, Globe].map((Icon, index) => (
                  <IconButton
                    key={index}
                    Icon={Icon}
                    delay={index * 0.2 + 0.8}
                  />
                ))}
              </motion.div>

              {/* Enhanced Welcome Text */}
              <div className="mb-12 space-y-6">
                <AnimatedText delay={1.5}>
                  <h1 className="text-4xl md:text-7xl font-bold">
                    <span className="inline-block bg-gradient-to-r from-violet-200 via-indigo-100 to-white bg-clip-text text-transparent">
                      Welcome To My
                    </span>
                  </h1>
                </AnimatedText>

                <AnimatedText delay={2}>
                  <motion.h2
                    className="text-5xl md:text-8xl font-black relative"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(139, 69, 255, 0.5)",
                        "0 0 40px rgba(139, 69, 255, 0.8)",
                        "0 0 20px rgba(139, 69, 255, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="bg-gradient-to-r from-violet-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                      Portfolio
                    </span>

                    {/* Animated underline */}
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 2.5, duration: 1 }}
                    />
                  </motion.h2>
                </AnimatedText>
              </div>

              {/* Enhanced Website Link */}
              <AnimatedText delay={3}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="https://www.ogijksn.my.id"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl relative group transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Button background with animated border */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl backdrop-blur-sm border border-violet-400/30"
                      animate={{
                        borderColor: [
                          "rgba(139, 69, 255, 0.3)",
                          "rgba(139, 69, 255, 0.8)",
                          "rgba(139, 69, 255, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Content */}
                    <div className="relative flex items-center gap-3 text-xl md:text-2xl">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Globe className="w-6 h-6 text-violet-400" />
                      </motion.div>

                      <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent font-semibold">
                        <TypewriterEffect text="www.ogijksn.my.id" />
                      </span>

                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Zap className="w-5 h-5 text-purple-400" />
                      </motion.div>
                    </div>
                  </a>
                </motion.div>
              </AnimatedText>

              {/* Loading progress indicator */}
              <motion.div
                className="mt-16 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
              >
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
