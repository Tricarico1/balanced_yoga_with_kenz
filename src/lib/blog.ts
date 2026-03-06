import { supabase } from './supabase'

export type BlogPost = {
  id: string
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string[]
  image_url?: string
  canva_embed_url?: string
  design_width?: number
  design_height?: number
  published: boolean
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  return data || []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data
}
