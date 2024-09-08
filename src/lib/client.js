import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId:"69060ayt",
    dataset:"production",
    apiVersion:"2021-10-21",
    useCdn: true,
    token: import.meta.env.VITE_SANITY_TOKEN
})

const builder = imageUrlBuilder(client)

export function urlFor(source){
    return builder.image(source)
}