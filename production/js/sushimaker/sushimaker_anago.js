class  Anago extends Sushimaker {
    constructor() {
        super('anago', 50, 20); //名前, dropSpeed, gameSpeed
        this.initImg();
            this.setRice(19); //シャリの右端のx座標

            this.setBaran(0, 4);
            this.setBaran(1, 4);
            this.setBaran(2, 4);
            this.setBaran(3, 4);
            this.setBaran(4, 4);
            this.setBaran(5, 4);
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

            this.setBaran(0, 10);
            this.setBaran(1, 10);
            this.setBaran(2, 10);
            this.setBaran(3, 10);
            this.setBaran(4, 10);
            this.setBaran(5, 10);
            this.setBaran(6, 10);
            this.setBaran(7, 10);
            this.setBaran(8, 10);
            this.setBaran(9, 10);
            this.setBaran(10,10);
            this.setBaran(11,10);
            this.setBaran(12,10);
            this.setBaran(13,10);
            this.setBaran(14,10);
            this.setBaran(15,10);
            this.setBaran(16,10);
            this.setBaran(17,10);
            this.setBaran(18,10);
            this.setBaran(19,10);
            
            this.setBaran(24,10);
            this.setBaran(25,10);
            this.setBaran(26,10);
            this.setBaran(27,10);
            this.setBaran(28,10);
            this.setBaran(29,10);
            this.setBaran(30,10);
            this.setBaran(31,10);
            this.setBaran(32,10);
            this.setBaran(33,10);
            this.setBaran(34,10);
            this.setBaran(35,10);
            this.setBaran(36,10);
            this.setBaran(37,10);
            this.setBaran(38,10);
            this.setBaran(39,10);

            this.setBaran(0, 16);
            this.setBaran(1, 16);
            this.setBaran(2, 16);
            this.setBaran(3, 16);
            this.setBaran(4, 16);
            this.setBaran(5, 16);
            this.setBaran(6, 16);
            this.setBaran(7, 16);
            this.setBaran(8, 16);
            this.setBaran(9, 16);
            this.setBaran(10,16);
            this.setBaran(11,16);
            this.setBaran(12,16);
            this.setBaran(13,16);
            this.setBaran(14,16);
            this.setBaran(15,16);
            this.setBaran(16,16);
            this.setBaran(17,16);
            this.setBaran(18,16);
            
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
            
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get(`anago${i}`)); 
    }
}