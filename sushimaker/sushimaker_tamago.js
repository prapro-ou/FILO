class  Tamago extends Sushimaker {
    constructor() {
        super('tamago', 150, 30); //名前, dropSpeed, gameSpeed
        this.initImg();
            this.setRice(19); //シャリの右端のx座標

            this.setBaran(0, 4);
            this.setBaran(1, 4);
            this.setBaran(2, 4);
           
            this.setBaran(8, 4);
            this.setBaran(9, 4);
            this.setBaran(10,4);
            
            this.setBaran(16,4);
            this.setBaran(17,4);
            this.setBaran(18,4);
            
            this.setBaran(24,4);
            this.setBaran(25,4);
            this.setBaran(26,4);
            
            this.setBaran(32,4);
            this.setBaran(33,4);
            this.setBaran(34,4);
            

            
            this.setBaran(5, 10);
            this.setBaran(6, 10);
            this.setBaran(7, 10);
            
            this.setBaran(13,10);
            this.setBaran(14,10);
            this.setBaran(15,10);
            
            this.setBaran(21,10);
            this.setBaran(22,10);
            this.setBaran(23,10);

            this.setBaran(29,10);
            this.setBaran(30,10);
            this.setBaran(31,10);
            
            this.setBaran(37,10);
            this.setBaran(38,10);
            this.setBaran(39,10);

            this.setBaran(0, 16);
            this.setBaran(1, 16);
            this.setBaran(2, 16);
            
            this.setBaran(8, 16);
            this.setBaran(9, 16);
            this.setBaran(10,16);
            
            this.setBaran(16,16);
            this.setBaran(17,16);
            this.setBaran(18,16);
            
            this.setBaran(24,16);
            this.setBaran(25,16);
            this.setBaran(26,16);
            
            this.setBaran(32,16);
            this.setBaran(33,16);
            this.setBaran(34,16);
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get('tamago${i}')); 
    }
}