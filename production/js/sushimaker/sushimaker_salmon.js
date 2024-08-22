class Salmon extends Sushimaker{
    constructor() {
        super('salmon', 200, 30);
        this.initImg();

        this.setRice(19);

        this.setBaran(1, 4);
        this.setBaran(2, 4);

        this.setBaran(7, 4);
        this.setBaran(8, 4);
        
        this.setBaran(12,4);
        this.setBaran(13,4);

        this.setBaran(17,4);
        this.setBaran(18,4);

        this.setBaran(23,4);
        this.setBaran(24,4);

        this.setBaran(29,4);
        this.setBaran(30,4);

        this.setBaran(35,4);
        this.setBaran(36,4);

        this.setBaran(0,10);
        this.setBaran(1,10);
    
        this.setBaran(6,10);
        this.setBaran(7,10);

        this.setBaran(12,10);
        this.setBaran(13,10);

        this.setBaran(18,10);
        this.setBaran(19,10);

        this.setBaran(24,10);
        this.setBaran(25,10);

        this.setBaran(30,10);
        this.setBaran(31,10);

        this.setBaran(36,10);
        this.setBaran(37,10);
        
        this.setBaran(1, 16);
        this.setBaran(2, 16);

        this.setBaran(7, 16);
        this.setBaran(8, 16);
        
        this.setBaran(12,16);
        this.setBaran(13,16);

        this.setBaran(17,16);
        this.setBaran(18,16);

        this.setBaran(23,16);
        this.setBaran(24,16);

        this.setBaran(29,16);
        this.setBaran(30,16);

        this.setBaran(35,16);
        this.setBaran(36,16);
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get(`salmon${i}`));
    }
}
