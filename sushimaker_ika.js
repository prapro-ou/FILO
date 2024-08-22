class Ika extends Sushimaker {
    constructor() {
        super('ika', 200, 30);
        this.initImg();

        this.setRice(19);


        this.setBaran(5, 4);
        this.setBaran(12, 4);
        this.setBaran(19, 4);
        this.setBaran(26, 4);
        this.setBaran(33, 4);
        this.setBaran(3, 9);
        this.setBaran(10, 9);
        this.setBaran(17, 9);
        this.setBaran(24, 9);
        this.setBaran(31, 9);
        this.setBaran(38, 9);
        this.setBaran(39, 9);
        this.setBaran(5, 14);
        this.setBaran(12, 14);
        this.setBaran(19, 14);
        this.setBaran(26, 14);
        this.setBaran(33, 14);
        this.setBaran(9, 19);
        this.setBaran(15, 19);
        this.setBaran(29, 19);
        this.setBaran(36, 19);
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get(`ika${i}`));
    }
}