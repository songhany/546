
let exportedMethods = {

    async getAboutMe() {
        let aboutMe = {
            name: "Songhan Yu",
            cwid: "10470449",
            biography: "I am newly computer science student.\nI like CS546. This class is very interesting.",
            favoriteShows: ["Glee", "Revenge", "Marvel's Agents of S.H.I.E.L.D."]
        };

        return aboutMe;
    }
}

module.exports = exportedMethods;