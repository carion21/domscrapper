const appName = "DomScrap";

const wordsKey = "videos youtube abidjan cote d'ivoire"

const appUrlDev = "http://192.168.1.106:5000"
const appUrlProd = "https://domscrapper.herokuapp.com"

const instagram = {
    intitule: "Instagram",
    lien: "https://www.instagram.com"
}
const facebook = {
    intitule: "Facebook",
    lien: "https://www.facebook.com"
}
const youtube1 = {
    intitule: "Youtube",
    lien: "https://www.youtube.com"
}
const youtube2 = {
    intitule: "Youtube",
    lien: "https://m.youtube.com"
}
const dailymotion = {
    intitule: "Dailymotion",
    lien: "https://www.dailymotion.com"
}
const pinterest1 = {
    intitule: "Pinterest",
    lien: "https://www.pinterest.com"
}
const pinterest2 = {
    intitule: "Pinterest",
    lien: "https://www.pinterest.fr"
}
const afriquele360 = {
    intitule: "Afrique Le 360",
    lien: "https://afrique.le360.ma"
}

const listeSource = [
    instagram,
    facebook,
    youtube1,
    youtube2,
    dailymotion,
    pinterest1,
    pinterest2,
    afriquele360
]

class Constante {

    static appName() {
        return appName
    }

    static appUrl() {
        let url = appUrlProd
        return url
    }

    static wordsKey(){
        return wordsKey
    }

    static  tranSpace(str)
    {
        str = str.replace(/[\s]{1,}/g," "); // Enlève les espaces doubles, triples, etc.
        str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
        str = str.replace(/[\s]$/,""); // Enlève les espaces à la fin
        return str;    
    }

    static  tranSpaceRecherche(str)
    {
        str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
        str = str.replace(/[\s]$/,""); // Enlève les espaces à la fin
        str = str.replace(/[\s]{1,}/g,"+"); // Enlève les espaces doubles, triples, et remplace par + etc.
        str = str.replace(/[']{1,}/g,"%27");

        return str;    
    }

    static  removeExtraSpace(str)
    {
        str = str.replace(/[\s]{1,}/g,""); // Enlève les espaces doubles, triples, etc.
        str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
        str = str.replace(/[\s]$/,""); // Enlève les espaces à la fin
        return str;    
    }

    static parserMot(str)
    {
        str = str.replace("'",""); // Enlève les espaces à la fin
        return str;    
    }

    static transformerLien(str)
    {
        str = str.replace("/url?q=",""); // Enlève la chaine de caractere ciblée pour transformer la chaine en lien
        return str;    
    }

    static transformerLienYoutube(str)
    {
        if(str !== null & str !== undefined) {
            str = str.replace("https://www.youtube.com/watch%3Fv%3D",""); // Enlève la chaine de caractere ciblée pour transformer la chaine en lien
            str = "https://www.youtube.com/embed/"+str.substr(0, 11)
        }
        
        return str;
    }

    static transformerLienVariante(str)
    {
        str = str.replace("/search?q=","https://www.google.com/search?q="); // Enlève la chaine de caractere ciblée pour transformer la chaine en lien
        return str;    
    }

    static trouverSource(str)
    {
        let element = {}

        listeSource.forEach(elementSource => {
            if (str.indexOf(elementSource.lien) !== -1) {
                element = elementSource
            }
        });

        if(element.intitule == undefined || element.lien == undefined){
            element = {
                intitule: "Source Non repertoriée",
                lien: str
            }
        }

        return element;
    }

    static recupererNombreMot(str)
    {
        var mots = str.split(" ")
        return mots.length
    }

}

module.exports = Constante