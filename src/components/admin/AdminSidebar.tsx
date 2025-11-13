import { LayoutDashboard, Mail, MessageSquare, Image, FileText, BarChart3, Star, Settings2, Database, User, Settings, Send, Users, Package } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuSections = [
  {
    label: 'Overview',
    items: [
      { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
      { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
    ]
  },
  {
    label: 'Content',
    items: [
      { title: 'Blog Posts', url: '/admin/blog', icon: FileText },
      { title: 'Blog Generator', url: '/admin/blog-generator', icon: Settings2 },
      { title: 'Gallery', url: '/admin/gallery', icon: Image },
      { title: 'Reviews', url: '/admin/reviews', icon: Star },
    ]
  },
  {
    label: 'Customer Data',
    items: [
      { title: 'Submissions', url: '/admin/submissions', icon: MessageSquare },
      { title: 'Newsletter', url: '/admin/newsletters', icon: Mail },
    ]
  },
  {
    label: 'SEO & Marketing',
    items: [
      { title: 'Google Indexing', url: '/admin/google-indexing', icon: Send },
      { title: 'Content Knowledge', url: '/admin/content-knowledge', icon: Database },
    ]
  },
  {
    label: 'Settings',
    items: [
      { title: 'Owner Profile', url: '/admin/owner-profile', icon: User },
      { title: 'GTM Setup', url: '/admin/gtm-docs', icon: Settings },
    ]
  }
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {menuSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className="hover:bg-muted/50"
                        activeClassName="bg-muted text-primary font-medium"
                      >
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
