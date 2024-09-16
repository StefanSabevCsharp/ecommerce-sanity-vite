import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "69060ayt",
    dataset: import.meta.env.VITE_SANITY_DATASET || "production",
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2021-10-21",
    useCdn: true,
    token: import.meta.env.VITE_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export function urlFor(source){
    return builder.image(source)
}