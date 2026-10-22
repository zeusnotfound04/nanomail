"use client";
import React, { useState, useEffect, ReactNode, AnchorHTMLAttributes } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon, GithubIcon, InstagramIcon, Linkedin01Icon, LockIcon, NewTwitterIcon, PackageIcon, Ticket01Icon } from "@hugeicons/core-free-icons";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};
interface HoveredLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}

const NavbarGlow = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full rounded-full bg-gradient-to-br from-[#00D8FF]/20 via-transparent to-[#427F39]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
  );
};

export const MenuItem = ({
  setActive,
  active,
  item,
  icon,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
      >
        {icon && <span className="text-[#00D8FF]">{icon}</span>}
        <motion.p
          className="text-white/90 group-hover:text-[#00D8FF] transition-colors duration-300"
        >
          {item}
        </motion.p>
      </motion.div>
      <NavbarGlow />
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.8rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={transition}
                layoutId="active-dropdown" 
                className="bg-black/90 backdrop-blur-lg rounded-xl overflow-hidden border border-[#00D8FF]/30 shadow-xl shadow-[#00D8FF]/20"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  <div className="relative z-10">
                    {children}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#00D8FF]/10 rounded-full blur-xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#427F39]/10 rounded-full blur-xl -z-10"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-white/10 bg-black/50 backdrop-blur-md shadow-lg flex justify-between items-center px-6 py-3"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00D8FF]/20 to-[#427F39]/20 blur-md opacity-50"></div>
      
      <div className="flex items-center relative z-10">
        <NanoMailLogo />
      </div>
      
      {isMobile && (
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-10 text-white p-2 focus:outline-none"
        >
          <motion.div
            animate={mobileMenuOpen ? { rotate: 45 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-0.5 bg-white mb-1"
          />
          <motion.div
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-0.5 bg-white mb-1"
          />
          <motion.div
            animate={mobileMenuOpen ? { rotate: -45, marginTop: -8 } : { rotate: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-0.5 bg-white"
          />
        </button>
      )}
      
      <div 
        className={`${isMobile ? 'absolute top-full mt-2 right-0 bg-black/90 border border-[#00D8FF]/30 rounded-xl overflow-hidden shadow-lg p-4 backdrop-blur-md transition-all duration-300' : 'flex items-center gap-6 relative z-10'} ${isMobile && !mobileMenuOpen ? 'opacity-0 invisible translate-y-[-10px]' : 'opacity-100 visible translate-y-0'}`}
      >
        {!isMobile && <div className="h-6 border-l border-white/20 mx-2"></div>}
        <div className={isMobile ? "flex flex-col space-y-4" : "flex items-center gap-6"}>
          {children}
        </div>
      </div>
    </motion.nav>
  );
};

export const MailServiceItem = ({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link href={href} className="flex space-x-3 group">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#00D8FF] to-[#427F39] flex items-center justify-center">
        <div className="text-white">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-base font-bold mb-1 text-white group-hover:text-[#00D8FF] transition-colors">
          {title}
        </h4>
        <p className="text-gray-300 text-sm max-w-[12rem]">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, href, icon, className = '' }: HoveredLinkProps) => {
  return (
    <Link
      href={href}
      className={`text-gray-300 hover:text-[#00D8FF] transition-colors duration-300 flex items-center gap-2 py-1 group ${className}`}
    >
      {icon && (
        <span className="text-[#00D8FF] opacity-70 group-hover:opacity-100 transition-opacity">
          {icon}
        </span>
      )}
      <span className="border-b border-transparent group-hover:border-[#00D8FF]/50 transition-all duration-300">
        {children}
      </span>
    </Link>
  );
}
const NanoMailLogo = () => (
  <div className="flex items-center">
    <Link href="/" className="flex items-center">
    
    <Image src="/logo-mark.png" alt="NanoMail logo" width={32} height={32} priority />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="ml-2 text-white font-bold text-lg"
    >

      <span className="font-cooper">Nano</span><span className="text-[#11baa9]">Mail</span>
    </motion.span>
    </Link>
  </div>
);

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false); 
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div
      className={cn("fixed top-5 inset-x-0 max-w-xl mx-auto z-50", className)}
    >
      <Menu 
        setActive={setActive} 
        isMobile={isMobile} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
      >
        {isMobile && <Link href="/" className="block mb-4"><NanoMailLogo /></Link>}
        
        {!isMobile && <div className="h-6 border-l border-white/20 mx-2"></div>}
        
        <MenuItem 
          setActive={setActive} 
          active={active} 
          item="Features"
        >
          <div className="flex flex-col space-y-3 text-sm min-w-[180px]">
            <HoveredLink href="#" icon={
              <HugeiconsIcon icon={LockIcon} className="h-4 w-4" />
            }>Secure Email</HoveredLink>
            <HoveredLink href="#" icon={
              <HugeiconsIcon icon={PackageIcon} className="h-4 w-4" />
            }>Instant Delivery</HoveredLink>
            <HoveredLink href="#" icon={
              <HugeiconsIcon icon={Ticket01Icon} className="h-4 w-4" />
            }>Unlimited Storage</HoveredLink>
            <HoveredLink href="#" icon={
              <HugeiconsIcon icon={FilterIcon} className="h-4 w-4" />
            }>Smart Filters</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem 
          setActive={setActive} 
          active={active} 
          item="Contact"
        >
          <div className="flex flex-col space-y-3 text-sm min-w-[180px]">
            <HoveredLink 
              href="https://x.com/Zeus_Notfound" 
              target="_blank" 
              rel="noopener noreferrer" 
              icon={
                <HugeiconsIcon icon={NewTwitterIcon} className="h-4 w-4 text-[#11baa9]" />
              }
            >X</HoveredLink>
            <HoveredLink 
              href="https://github.com/zeusnotfound04" 
              target="_blank" 
              rel="noopener noreferrer" 
              icon={<HugeiconsIcon icon={GithubIcon} className="h-4 w-4 text-[#11baa9]" />}
            >GitHub</HoveredLink>
            <HoveredLink 
              href="https://www.instagram.com/zeusnotfound04/" 
              target="_blank" 
              rel="noopener noreferrer" 
              icon={
                <HugeiconsIcon icon={InstagramIcon} className="h-4 w-4 text-[#11baa9]" />
              }
            >Instagram</HoveredLink>
            <HoveredLink 
              href="https://www.linkedin.com/in/vishesh-prajapati-520599302/" 
              target="_blank" 
              rel="noopener noreferrer" 
              icon={
                <HugeiconsIcon icon={Linkedin01Icon} className="h-4 w-4 text-[#11baa9]" />
              }
            >LinkedIn</HoveredLink>
          </div>
        </MenuItem>
        
        <Link
          href="/faq"
          className="relative group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
          >
            <motion.p
              className="text-white/90 group-hover:text-[#00D8FF] transition-colors duration-300"
            >
              FAQ
            </motion.p>
          </motion.div>
          <div className="absolute inset-0 -z-10 h-full w-full rounded-full bg-gradient-to-br from-[#00D8FF]/20 via-transparent to-[#427F39]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
        </Link>
      </Menu>
    </div>
  );
}