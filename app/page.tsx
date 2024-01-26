import Image from "next/image";
import { createClient } from "next-sanity";
import { Post } from "@/schema";
import imageUrlBuilder  from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";


const client = createClient({
  projectId: '72uhp6fc',
  dataset: 'production',
  apiVersion: "2022-03-25",
  useCdn: true
})

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export default async function Home() {

  const posts = await client.fetch(`*[_type == "post"] | order(_createdAt desc)`) as Post[]

  return (
    <main className="flex p-8 pt-16 lg:pt-24 lg:p-48 min-h-screen flex-col items-left gap-16 lg:gap-24 p-24">
      <div className="flex">
        <a href='/' className="-mb-8 lg:mb-0">
          <h1 className="text-2xl font-bold hover:underline inline-block">Patrick&apos;s Secret Diary</h1>
        </a>
      </div>
      <div className="flex flex-col items-center gap-8">
        <a href={`/posts/${posts[0].slug?.current}`} className="w-full lg:w-auto transition-colors duration-300 ease-in-out hover:text-emerald-800">
          <div className="flex flex-col gap-2 lg:gap-4">
            <h6>{posts[0].genre?.toUpperCase()}</h6>
            <div className="w-full h-80 lg:h-96 relative">
              <Image style={{objectFit: 'cover'}} fill src={urlFor(posts[0].image as SanityImageSource).url()} alt="thumbnail" /> 
            </div>
            <h6 className="text-sm">{new Date(posts[0]._createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric'})}</h6>
            <h3 className="text-3xl lg:text-6xl font-bold">{posts[0].title}</h3>
            <p className="text-xl italic">{posts[0].description}</p>
          </div>
        </a>
      </div>
      <div className="flex justify-center">
        <hr className="w-48 h-0.5 bg-slate-950"></hr>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 auto-cols-fr gap-16">
        {posts.slice(1).map(post => (
          <a key={post.slug?.current} href={`/posts/${post.slug?.current}`} className="transition-colors duration-300 ease-in-out hover:text-emerald-800">
            <div className="flex flex-row gap-4">
              <div style={{height: '175px', width: '300px'}} className="relative">
                <Image style={{objectFit: 'cover'}} fill src={urlFor(post.image as SanityImageSource).url()} alt="thumbnail" /> 
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <h6 className="text-xs">{post.genre?.toUpperCase()}</h6>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-sm md:text-md italic">{post.description}</p>
                  <h6 className="text-xs">{new Date(post._createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric'})}</h6>
                </div>
              </div>
            </div>
          </a>))}
      </div>
    </main>
  )
}