import HousingDAO from "../dao/housingDAO.js"

export default class HousingController {
    static async apiGetHousing(req, res, next) {
        const housingPerPage = req.query.housingPerPage ? parseInt(req.query.housingPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.address) {
            filters.address = req.query.address
        } else if (req.query.block) {
            filters.block = req.query.block
        }

        const { housingList, totalNumHousing } = await HousingDAO.getHousing({
            filters,
            page,
            housingPerPage,
        })

        let response = {
            housing: housingList,
            page: page,
            filters: filters,
            entries_per_page: housingPerPage,
            total_results: totalNumHousing,
        }
        res.json(response)
    }

    static async apiGetHousingTown(req, res, next) {
        try {
            let town = await HousingDAO.getHousingTown()
            res.json(town)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}