"use client";

import * as React from "react";
import {
  AudioWaveform,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react";

import { NavFavorites } from "@/components/nav-favorites";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavWorkspaces } from "@/components/nav-workspaces";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Separator } from "./ui/separator";

// This is sample data.
const data = {
  teams: [
    {
      name: "Engineering",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Marketing",
      logo: AudioWaveform,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "AI Assistant",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "5",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Archive",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Support",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: "Q4 Product Roadmap",
      url: "#",
      emoji: "🎯",
    },
    {
      name: "Bug Tracking Dashboard",
      url: "#",
      emoji: "🐛",
    },
    {
      name: "Sprint Planning",
      url: "#",
      emoji: "🏃",
    },
    {
      name: "Release Schedule",
      url: "#",
      emoji: "📅",
    },
    {
      name: "Team OKRs",
      url: "#",
      emoji: "🎯",
    },
    {
      name: "Customer Feedback",
      url: "#",
      emoji: "💬",
    },
    {
      name: "Resource Allocation",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Project Timeline",
      url: "#",
      emoji: "⏱️",
    },
    {
      name: "Team Performance",
      url: "#",
      emoji: "📈",
    },
    {
      name: "Documentation",
      url: "#",
      emoji: "📚",
    },
  ],
  workspaces: [
    {
      name: "Product Development",
      emoji: "💻",
      pages: [
        {
          name: "Feature Planning",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Sprint Backlog",
          url: "#",
          emoji: "📋",
        },
        {
          name: "Technical Specs",
          url: "#",
          emoji: "⚙️",
        },
      ],
    },
    {
      name: "Project Management",
      emoji: "📊",
      pages: [
        {
          name: "Timeline & Milestones",
          url: "#",
          emoji: "📅",
        },
        {
          name: "Resource Management",
          url: "#",
          emoji: "👥",
        },
        {
          name: "Risk Assessment",
          url: "#",
          emoji: "⚠️",
        },
      ],
    },
    {
      name: "Team Collaboration",
      emoji: "🤝",
      pages: [
        {
          name: "Meeting Notes",
          url: "#",
          emoji: "📝",
        },
        {
          name: "Team Updates",
          url: "#",
          emoji: "📢",
        },
        {
          name: "Knowledge Base",
          url: "#",
          emoji: "📚",
        },
      ],
    },
    {
      name: "Quality Assurance",
      emoji: "🎯",
      pages: [
        {
          name: "Test Cases",
          url: "#",
          emoji: "✅",
        },
        {
          name: "Bug Reports",
          url: "#",
          emoji: "🐛",
        },
        {
          name: "Performance Metrics",
          url: "#",
          emoji: "📊",
        },
      ],
    },
    {
      name: "Customer Success",
      emoji: "🎉",
      pages: [
        {
          name: "Support Tickets",
          url: "#",
          emoji: "🎫",
        },
        {
          name: "Customer Feedback",
          url: "#",
          emoji: "💬",
        },
        {
          name: "Feature Requests",
          url: "#",
          emoji: "💡",
        },
      ],
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center">
          <Image
            src="/board.svg"
            alt="Logo"
            width={80}
            height={80}
            className="ml-2 mr-2 h-8 w-8"
          />
          <Separator orientation="vertical" className="mx-2 bg-stone-800" />
          <TeamSwitcher teams={data.teams} />
        </div>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
