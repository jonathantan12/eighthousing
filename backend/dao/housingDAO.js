let housing

export default class HousingDAO {
  static async injectDB(conn) {
    if (housing) {
      return
    }
    try {
      housing = await conn.db(process.env.RESTHOUSING_NS).collection("hdb_prices_2017onwards")
    } catch (e) {
      console.error( 
        `Unable to establish a collection handle in housingDAO: ${e}`,
      )
    }
  }

  static async getHousing({
    filters = null,
    page = 0,
    housingPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("address" in filters) {
        query = { $text: { $search: filters["address"] } }
      } else if ("block" in filters) {
        query = { block: { $eq: filters["block"] } }
      }
    }

    let cursor

    try {
      cursor = await housing
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { housingList: [], totalNumHousing: 0 }
    }

    const displayCursor = cursor.limit(housingPerPage).skip(housingPerPage * page)

    try {
      const housingList = await displayCursor.toArray()
      const totalNumHousing = await housing.countDocuments
      return {housingList, totalNumHousing}
    } catch (e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`,
        )
        return { housingList: [], totalNumHousing: 0 }
    }
    }   
    
    // Getting distinct towns
    static async getHousingTown() {
      let town = []
      try {
        town = await housing.distinct("town")
        return town
      } catch (e) {
        console.error(`Unable to get towns, ${e}`)
        return town
      }
    }
}
