const express = require ('express')
const uuid = require('uuid')

const port = 3001
const app = express()
app.use(express.json())

const orders = []

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = orders.findIndex(thisOrder => thisOrder.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "user not found" })
    }
    request.userIndex = index
    request.userId = id
    next()

}
app.get('/orders', (request, response)  =>{
    return response.json({ orders}) 
})
app.post('/orders', (request, response) => {
    const { order, clientName, price, status  } = request.body
    const  thisOrder = { id: uuid.v4(), order, clientName, price, status }
    orders.push(thisOrder )

    return response.status(201).json(thisOrder )
})

app.put('/orders/:id', checkUserId, (request, response) => {

    const { order, clientName, price, status } = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = { id, order, clientName, price, status }


    orders[index] = updatedUser
    return response.json(updatedUser)
})

app.delete('/orders/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    orders.splice(index, 1)
    return response.status(204).json

})



app.listen(port, () => {
    console.log(`🥇 ${port}`)
})