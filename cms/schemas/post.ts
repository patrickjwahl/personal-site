export default {
    name: 'post',
    type: 'document',
    title: 'Post',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug'
        },
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'image',
            type: 'image',
            title: 'Image'
        },
        {
            name: 'date',
            type: 'date',
            title: "Date"
        },
        {
            name: 'body',
            type: 'array',
            title: 'Body',
            of: [
                {
                    type: 'block'
                }
            ]
        },
        {
            name: 'genre',
            type: 'string',
            title: 'Genre'
        }
    ]
}