        class Ebi extends Sushimaker{
    constructor() {
        super('ebi', 200, 30);
        this.initImg();

        this.setRice(19);
        this.setBaran(19, 7);
        this.setBaran(20, 7);
        this.setBaran(21, 7);
        this.setBaran(22, 7);
        this.setBaran(4, 11);
        this.setBaran(5, 11);
        this.setBaran(6, 11);
        this.setBaran(7, 11);
        this.setBaran(34, 11);
        this.setBaran(35, 11);
        this.setBaran(36, 11);
        this.setBaran(37, 11);
        this.setBaran(11, 15);
        this.setBaran(12, 15);
        this.setBaran(13, 15);
        this.setBaran(14, 15);
        this.setBaran(27, 15);
        this.setBaran(28, 15);
        this.setBaran(29, 15);
        this.setBaran(30, 15);
        this.setBaran(17, 17);
        this.setBaran(18, 17);
        this.setBaran(23, 17);
        this.setBaran(24, 17);
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get(`ebi${i}`));
    }
}