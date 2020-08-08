require('dotenv').config()
const faunadb = require('faunadb')
const shortid = require('shortid')
const axios = require('axios')
const querystring = require('querystring')

const q = faundadb.query
const client = new faunadb.Client({
    secret: process.env.FAUNADB
})

module.exports.handler = async event => {
    // takes data from the submitted form
    const data = querystring.parse(event.body)
    // generate unique path
    const uniquePath = shortid.generate()
    // append path to data body
    data.path = uniquePath

    const page = {
        data: data
    }

    try {
        const queryResponse = await client.query(
            q.Create(
                q.Collection('page'),
                page
            )
        )
        const response = {
            statusCode: 200,
            body: JSON.stringify(queryResponse)
        }
        return response
    } catch(error) {
        const errorResponse = {
            statusCode: 400,
            body: JSON.stringify(error)
        }
        return errorResponse
    }
}