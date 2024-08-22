class Toro extends Sushimaker {
    constructor() {
        super('toro', 130, 20);
        this.initImg();
            this.setRice(18);

            this.setBaran(0,4);
            this.setBaran(6, 4);
            this.setBaran(7, 4);
            this.setBaran(8, 4);
            this.setBaran(9, 4);
            this.setBaran(10,4);
            this.setBaran(11,4);
            this.setBaran(12,4);
            this.setBaran(13,4);
            this.setBaran(14,4);
            this.setBaran(15,4);
            this.setBaran(16,4);
            this.setBaran(17,4);
            this.setBaran(18,4);
            this.setBaran(19,4);
            this.setBaran(20,4);
            this.setBaran(21,4);
            this.setBaran(22,4);
            this.setBaran(23,4);
            this.setBaran(24,4);
            this.setBaran(25,4);
            this.setBaran(26,4);
            this.setBaran(27,4);
            this.setBaran(28,4);
            this.setBaran(29,4);
            this.setBaran(30,4);
            this.setBaran(31,4);
            this.setBaran(32,4);
            this.setBaran(33,4);
            this.setBaran(34,4);
            this.setBaran(35,4);
            this.setBaran(36,4);
            this.setBaran(37,4);
            this.setBaran(38,4);
            this.setBaran(39,4);

            this.setBaran(0, 8);
            this.setBaran(1, 8);
            this.setBaran(2, 8);

            this.setBaran(10,7);
            this.setBaran(11,7);
            this.setBaran(12,7);
            this.setBaran(13,7);
            this.setBaran(14,7);
            this.setBaran(15,7);
            this.setBaran(16,7);
            this.setBaran(17,7);
            this.setBaran(18,7);
            this.setBaran(19,7);

            this.setBaran(0,12);
            this.setBaran(1,12);
            this.setBaran(2,12);
            this.setBaran(3,12);
            this.setBaran(4,12);
            this.setBaran(5,12);
            this.setBaran(6,12);
            this.setBaran(7,12);

            this.setBaran(12,12);
            this.setBaran(13,12);
            this.setBaran(14,12);
            this.setBaran(15,12);
            this.setBaran(16,12);
            this.setBaran(17,12);
            this.setBaran(18,12);
            this.setBaran(19,12);
            this.setBaran(20,12);
            this.setBaran(21,12);
            this.setBaran(22,12);
            this.setBaran(23,12);
            this.setBaran(24,12);
            this.setBaran(25,12);
            this.setBaran(26,12);
            this.setBaran(27,12);
            this.setBaran(28,12);
            this.setBaran(29,12);
            this.setBaran(30,12);
            this.setBaran(31,12);
            this.setBaran(32,12);
            this.setBaran(33,12);
            this.setBaran(34,12);
            this.setBaran(35,12);
            this.setBaran(36,12);
            this.setBaran(37,12);
            this.setBaran(38,12);
            this.setBaran(39,12);

            this.setBaran(15,14);
            this.setBaran(16,14);
            this.setBaran(17,14);

            this.setBaran(23,16);
            this.setBaran(24,16);
            this.setBaran(25,16);
            this.setBaran(26,16);
            this.setBaran(27,16);
            this.setBaran(28,16);
            this.setBaran(29,16);
            this.setBaran(30,16);
            this.setBaran(31,16);
            this.setBaran(32,16);
            this.setBaran(33,16);
            this.setBaran(34,16);
            this.setBaran(35,16);
            this.setBaran(36,16);
            this.setBaran(37,16);
            this.setBaran(38,16);
            this.setBaran(39,16);

            this.setBaran(33,10);
            this.setBaran(34,10);
            this.setBaran(35,10);

            this.setBaran(0,17);
            this.setBaran(1,17);
            this.setBaran(2,17);
            this.setBaran(3,17);
            this.setBaran(4,17);
            this.setBaran(5,17);
            this.setBaran(6,17);
            this.setBaran(7,17);
            this.setBaran(8,17);
            this.setBaran(9,17);
            this.setBaran(10,17);

            this.setBaran(20,17);
            this.setBaran(21,17);
            this.setBaran(22,17);

            this.setBaran(27,19);
            this.setBaran(28,19);
            this.setBaran(29,19);
            this.setBaran(30,19);

            this.setBaran(2,20);
            this.setBaran(3,20);
            this.setBaran(4,20);
            this.setBaran(5,20);
            this.setBaran(6,20);
            this.setBaran(7,20);
            this.setBaran(8,20);
            this.setBaran(9,20);
            this.setBaran(10,20);
            this.setBaran(11,20);
            this.setBaran(12,20);
            this.setBaran(13,20);
            this.setBaran(14,20);
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get(`toro${i}`));
    }
}