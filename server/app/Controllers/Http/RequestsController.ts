import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Client } from '@notionhq/client'
import Env from '@ioc:Adonis/Core/Env'

export default class RequestsController {
    public async Index({ view }: HttpContextContract) {

       let database = await Search()

       return await view.render("index", {
           //@ts-ignore
           tags_db: database.results[0].properties.Tags.multi_select.options
       })
    }

    public async Save_To_DB({ request, response }: HttpContextContract) {
        let { title, url, description, tags } = request.all()
        let tag_array = tags.split(':')
        let tag_array_object = tag_array.map(element => {
            return { name: element }
        })

        let database = await Search()
        let database_id = database.results[0].id

        let response_ = await notion.pages.create({
            parent: {
                database_id: database_id
            }, 
            properties: {
                Nom: {
                    //@ts-ignore
                    title: [
                        {
                            type: "text", 
                            text: {
                                content: title
                            }
                        },
                    ],
                }, 
                Description: {
                    //@ts-ignore
                    rich_text: [
                        {
                            text: {
                                content: description,
                            },
                        },
                    ],
                }, 
                Tags: {
                    //@ts-ignore
                    multi_select: tag_array_object,
                }, 
                URL: {
                    //@ts-ignore
                    type: "url", 
                    url: url
                }

            }
        })

        return response.created({ data: response_ })
    }
}






const notion = new Client({
    auth: Env.get('TOKEN')
})

async function Search(){
    const reponse = await notion.search({
        query: 'Sites',
        filter: {
            value: 'database', 
            property: 'object'
        }
    })

    return reponse
}
