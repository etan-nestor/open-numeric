"use client";

import {
  // Base
  Code2, PenTool, GraduationCap, Wrench, ShoppingBag,
  Globe, Smartphone, Server, Network, Lightbulb,
  BookOpen, ShieldCheck, MonitorSmartphone, Printer,
  Palette,
  MapPin,
  Phone,
  Mail,
  User,
  Briefcase,
  BadgeCheck,
  ArrowLeft,
  ArrowRight,
  Check,
  Send,
  CreditCard,
  BarChart3,
  Bell,
  Route,
  Webhook,
  Accessibility,
  FileCode,
  AlignLeft,
  CircleCheck,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Monitor, Link2, Ruler, FlaskConical, Code, UploadCloud,
  ChartCandlestick, Layout, Image as ImageIcon, Film,
  Eye, Users, Zap, Layers, Cpu, HardDrive, Axe, Shield,
  Clock, Settings, ShoppingCart, Cable, Wifi,
  BatteryCharging, Headphones, Mouse, Laptop, Battery,
  Usb, Search, Truck, FileText, Sparkles, CheckCircle,
  Package,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Code2, PenTool, GraduationCap, Wrench, ShoppingBag,
  Globe, Smartphone, Server, Network, Lightbulb,
  BookOpen, ShieldCheck, MonitorSmartphone, Printer,
  Palette,
  MapPin,
  Phone,
  Mail,
  User,
  Briefcase,
  FileText,
  BadgeCheck,
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  BarChart3,
  Users,
  Zap,
  Bell,
  Route,
  Layers,
  Webhook,
  Package,
  Accessibility,
  FileCode,
  AlignLeft,
  Send,
  CircleCheck,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Monitor, Link2, Ruler, FlaskConical, Code, UploadCloud,
  ChartCandlestick, Layout, Image: ImageIcon, Film,
  Eye, Cpu, HardDrive, Axe, Shield,
  Clock, Settings, ShoppingCart, Cable, Wifi,
  BatteryCharging, Headphones, Mouse, Laptop, Battery,
  Usb, Search, Truck, Sparkles, CheckCircle,
};

interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  const LucideIcon = ICONS[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} />;
}