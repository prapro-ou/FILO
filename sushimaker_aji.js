class Aji extends Sushimaker{
    constructor() {
        super('aji', 200, 30);
        this.initImg();

        this.setRice(19);
        this.setBaran(6, 4);
        this.setBaran(7, 4);
        this.setBaran(8, 4);
        this.setBaran(13, 4);
        this.setBaran(14, 4);
        this.setBaran(15, 4);
        this.setBaran(16, 4);
        this.setBaran(17, 4);
        this.setBaran(18, 4);
        this.setBaran(19, 4);
        this.setBaran(20, 4);
        this.setBaran(21, 4);
        this.setBaran(22, 4);
        this.setBaran(23, 4);
        this.setBaran(24, 4);
        this.setBaran(25, 4);
        this.setBaran(26, 4);
        this.setBaran(33, 4);
        this.setBaran(34, 4);
        this.setBaran(35, 4);
        this.setBaran(36, 4);
        this.setBaran(37, 4);
        this.setBaran(38, 4);
        this.setBaran(39, 4);
        this.setBaran(17, 9);
        this.setBaran(18, 9);
        this.setBaran(19, 9);
        this.setBaran(20, 9);
        this.setBaran(21, 9);
        this.setBaran(37, 16);
        this.setBaran(38, 16);
        this.setBaran(39, 16);
        this.setBaran(33, 10);
        this.setBaran(34, 10);
        this.setBaran(35, 10);
        this.setBaran(0, 15);
        this.setBaran(1, 15);
        this.setBaran(2, 15);
        this.setBaran(3, 15);
        this.setBaran(4, 15);
        this.setBaran(5, 15);
        this.setBaran(6, 15);
        this.setBaran(7, 15);
        this.setBaran(8, 15);
        this.setBaran(9, 15);
        this.setBaran(10, 15);
        this.setBaran(11, 15);
        this.setBaran(12, 15);
        this.setBaran(20, 17);
        this.setBaran(21, 17);
        this.setBaran(22, 17);
        this.setBaran(27, 19);
        this.setBaran(28, 19);
        this.setBaran(29, 19);
        this.setBaran(30, 19);
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get(`aji${i}`));
    }
}