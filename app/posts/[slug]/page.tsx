import Image from "next/image";
import { createClient } from "next-sanity";
import { Post } from "@/schema";
import imageUrlBuilder  from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText, PortableTextComponents, PortableTextReactComponents } from "@portabletext/react";
import { Metadata } from "next";

const client = createClient({
  projectId: '72uhp6fc',
  dataset: 'production',
  apiVersion: "2022-03-25",
  useCdn: false
})

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export default async function PostPage({ params }: { params: { slug: string }}) {

  const { slug } = params
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, {slug}) as Post

  const components: PortableTextComponents = {
    block: {
        normal: ({children}) => <p className="mb-8">{children}</p>,
        blockquote: ({children}) => <div className="mb-8 px-8 md:px-24"><blockquote className="text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold px-8 border-l-4 border-slate-950 border-solid">{children}</blockquote></div>,
        h3: ({children}) => <div className="mb-8 px-8 py-8"><blockquote className="text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold px-8 border-l-4 border-slate-950 border-solid">{children}</blockquote></div>,
        h2: ({children}) => <div className="flex justify-center mb-8"><p>&#43612;</p></div>,
        h1: ({children}) => <h2 className="text-lg md:text-2xl font-bold mt-4 mb-4">{children}</h2>,
        h4: ({children}) => <br />,
        h5: ({children}) => <p className="text-xs md:text-lg ml-8">{children}</p>,
        h6: ({children}) => <p className="text-xs md:text-lg">{children}</p>
    },
    marks: {
        link: ({value, children}) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <a className="underline transition-colors duration-300 ease-in-out text-indigo-700 hover:text-indigo-400" href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined}>
                {children}
                </a>
            )
        }
    }
  }

  if (!post.body) {
    return <div></div>
  }

  return (
    <main className="flex p-8 pt-16 lg:pt-24 lg:p-48 min-h-screen flex-col items-left gap-16 lg:gap-24 p-24">
      <div className="flex">
        <a href='/' className="lg:mb-0">
          <h1 className="text-2xl font-bold hover:underline inline-block">Patrick&apos;s Secret Diary</h1>
        </a>
      </div>
      <div className="flex flex-col gap-4 md:px-24 xl:px-48 2xl:px-80">
        <h1 className="text-3xl lg:text-4xl font-bold">{post.title}</h1>
        <h3 className="text-xl">{post.description}</h3>
        <div className="flex justify-between">
            <h6 className="text-sm">{post.genre?.toUpperCase()}</h6>
            <h6 className="text-sm">{new Date(post.date || post._createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</h6>
        </div>
        <hr className="w-full h-0.5 bg-slate-950"></hr>
        <div className="w-full h-64 md:h-big relative mb-4">
            <Image style={{height: '100%', objectFit: 'cover'}} fill src={urlFor(post.image as SanityImageSource).url()} alt="thumbnail" /> 
        </div>
        <div className="text-md sm:text-xl leading-7 sm:leading-9">
            <PortableText value={post.body} components={components} />
            <p className="text-right">&#9737;</p>
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
    const posts = await client.fetch(`*[_type == "post"]`) as Post[]
    return posts.map(post => ({ slug: post.slug?.current }))
}

export async function generateMetadata({ params }: { params: { slug: string }}) {

    const slug = params.slug
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, {slug}) as Post

    return {
        title: `${post.title} | Patrick's Scribblings`,
        description: post.description
    }
}