require('dotenv').config()
const faunadb = require('faunadb')
const pageTemplate = require('./temlpate.js')

const q = faunadb.query
const client = new faunadb.Client({
    secret: process.env.FAUNADB
})

module.exports.handler = async event => {
    const path = event.queryStringParameters.id.replce('/', '')
    try {
        const queryResponse = await client.query(
            q.Get(q.Match(q.Index('page_by_path')))
        )

        const response = {
            statusCode: 200,
            body: pageTemplate(queryResponse.data)
        }
        return response
    } catch(error) {
        const errorResponse = {
            statusCode: 301,
            headers: {
                Location: `/notfound.html`
            }
        }
        return errorResponse
    }
} 