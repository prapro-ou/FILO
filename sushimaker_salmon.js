class Salmon extends Sushimaker{
    constructor() {
        super('salmon', 200, 30);
        this.initImg();

        this.setRice(19);
        this.setBaran(0, 9);
        this.setBaran(1, 9);
        this.setBaran(6, 9);
        this.setBaran(7, 9);
        this.setBaran(12, 9);
        this.setBaran(13, 9);
        this.setBaran(18, 9);
        this.setBaran(19, 9);
        this.setBaran(24, 9);
        this.setBaran(25, 9);
        this.setBaran(30, 9);
        this.setBaran(31, 9);
        this.setBaran(36, 9);
        this.setBaran(37, 9);
        this.setBaran(1, 16);
        this.setBaran(2, 16);
        this.setBaran(7, 16);
        this.setBaran(8, 16);
        this.setBaran(13, 16);
        this.setBaran(12, 16);
        this.setBaran(17, 16);
        this.setBaran(18, 16);
        this.setBaran(23, 16);
        this.setBaran(24, 16);
        this.setBaran(29, 16);
        this.setBaran(30, 16);
        this.setBaran(35, 16);
        this.setBaran(36, 16);
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get(`salmon${i}`));
    }
}