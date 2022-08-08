import { FakeDb } from "../db/FakeDb.js"
import { BadRequest } from "../utils/Errors.js"


class BurgersService {
    async editBurger(burgerId, burgerData){
        let burger = await this.getBurgerById(burgerId)
        burger.name = burgerData.name || burger.name
        burger.toppings = burgerData.toppings || burger.toppings
        return burger
    }

    async getBurgerById(burgerId){
    let burger = FakeDb.burgers.find(b => b.id == burgerId)
    if (!burger){
        throw new BadRequest("Invalid ID")
    }
    return burger
    }

    async createBurger(burgerData){
        burgerData.id = FakeDb.burgers.length
        FakeDb.burgers.push(burgerData)
        return burgerData
    }

    async getBurgers(){
        return FakeDb.burgers
    }

    async deleteBurger(burgerId){
        let burger = await this.getBurgerById(burgerId)
        let burgerIndex = FakeDb.burgers.indexOf(burger)
        FakeDb.burgers.splice(burgerIndex, 1)
        return burger
    }
}

export const burgersService = new BurgersService()