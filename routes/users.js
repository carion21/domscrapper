var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/domscrapper_proto', async (req, res, next) => {

    let data = req.body
    

    let listeTitre = []
    let listeLien = []
    let listeImage = []
    let listeSource = []
    let listeDate = []

    //liste des varaintes de recherche Google : Vidéos ; Actualités ; Images
    let listeVariante = []
    let nombreElement = 0

    let recherche = "danse yope"
    let r = Constante.tranSpaceRecherche(recherche)
    let lienRecherche = "https://www.google.com/search?q=" + r


    console.log(r)
    console.log(lienRecherche)

    const site = "https://www.google.com/search?q=inondation+abidjan+2020+videos"

    const fetchData = async () => {
        const result = await axios.get(lienRecherche);
        return cheerio.load(result.data);
    };


    const getResults = async () => {

        const $ = await fetchData();

        // recupere les liens de videos, images et actualités
        $('a.eZt8xd').each((index, element) => {
            listeVariante.push(Constante.transformerLienVariante($(element).attr('href')))
            //console.log(Constante.transformerLienVariante($(element).attr('href')))
        })

        /**
         * permet de recuperer le lien video
         */
        $('div>div.ZINbbc.xpd.O9g5cc.uUPGi>div.kCrYT>a').each((index, element) => {
            var slien = "Lien " + index + " : " + Constante.transformerLien($(element).attr('href'))
            // je recupere seulement les premiers elements
            if (index % 2 == 0) {
                let lien = Constante.transformerLien($(element).attr('href'))
                listeLien.push(lien)
                //console.log("ok")
                //console.log(slien)
            } else {
                //console.log("nok")
                //console.log(slien)
            }
            //console.log($(element).attr('href'))
        })

        /**
         * permet de recuperer l'image s'affichant en premier sur la video
         */
        $('div>div.ZINbbc.xpd.O9g5cc.uUPGi>div.kCrYT>a>div.lcJF1d.SXn0g.GXKcHe.p1CInd>div>img').each((index, element) => {
            let simage = "Image " + index + " : " + $(element).attr('src')
            let image = $(element).attr('src')
            listeImage.push(image)
            //console.log(simage)
            //console.log($(element).attr('href'))
        })

        /**
         * permet de recuperer le titre de la video
         */
        $('div>div.ZINbbc.xpd.O9g5cc.uUPGi>div.kCrYT>a>h3.zBAuLc>div.BNeawe.vvjwJb.AP7Wnd').each((index, element) => {
            let titre = $(element).text()
            listeTitre.push(titre)
            //console.log(titre)
            //console.log(index)
            nombreElement = index
        })

        /**
         * permet de recuperer la source de la vidéo
         */
        $('div>div.ZINbbc.xpd.O9g5cc.uUPGi>div.kCrYT>a>div.BNeawe.UPmit.AP7Wnd').each((index, element) => {
            let source = Constante.trouverSource(Constante.removeExtraSpace($(element).text()))
            //console.log($(element).text())
            //console.log($(element).text())
            //console.log(source)
            listeSource.push(source)
        })

        /**
         * permet de recuperer la date de publication de la vidéo
         */
        $('div>div.ZINbbc.xpd.O9g5cc.uUPGi>div.kCrYT>div>div.BNeawe.s3v9rd.AP7Wnd>div>div>div.BNeawe.s3v9rd.AP7Wnd>span.r0bn4c.rQMQod').each((index, element) => {
            // je recupere seulement les premiers elements
            if (index % 2 == 0) {
                let date = $(element).text()
                listeDate.push(date)
                //console.log("ok")
                //console.log($(element).text())
            } else {
                //console.log("nok")
                //console.log($(element).text())
            }
            //console.log($(element).text())

        })

        return {
            nombreElement: nombreElement + 1,
            listeTitre: listeTitre,
            listeSource: listeSource,
            listeLien: listeLien,
            listeImage: listeImage,
            listeDate: listeDate,
            listeVariante: listeVariante
        }
    };

    const totalInformation = await getResults()

    console.log(totalInformation)

    //res.redirect('/')

    res.json(totalInformation)
})


module.exports = router;