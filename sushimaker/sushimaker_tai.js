class  Tai extends Sushimaker {
    constructor() {
        super('Tai', 50, 20); 
        this.initImg();
            this.setRice(19); 

            this.setBaran(4, 4);
            this.setBaran(5, 4);

            this.setBaran(11,4);
            this.setBaran(12,4);
            
            this.setBaran(18,4);
            this.setBaran(19,4);
            
            this.setBaran(25,4);
            this.setBaran(26,4);
            
            this.setBaran(32,4);
            this.setBaran(33,4);

            this.setBaran(2, 9);
            this.setBaran(3, 9);
            
            this.setBaran(9, 9);
            this.setBaran(10,9);
            
            this.setBaran(16,9);
            this.setBaran(17,9);
            
            this.setBaran(23,9);
            this.setBaran(24,9);
            
            this.setBaran(30,9);
            this.setBaran(31,9);
            
            this.setBaran(37,9);
            this.setBaran(38,9);
            this.setBaran(39,9);

            this.setBaran(4, 14);
            this.setBaran(5, 14);
            
            this.setBaran(11,14);
            this.setBaran(12,14);
            
            this.setBaran(18,14);
            this.setBaran(19,14);
            
            this.setBaran(25,14);
            this.setBaran(26,14);
            
            this.setBaran(32,14);
            this.setBaran(33,14);
            
            
            this.setBaran(8, 19);
            this.setBaran(9, 19);
            
            this.setBaran(14,19);
            this.setBaran(15,19);
            
            this.setBaran(28,19);
            this.setBaran(29,19);
            
            this.setBaran(35,19);
            this.setBaran(36,19);
    }

    initImg() {
        super.initImg();
        for (let i = 1; i <= 4; i++) this.blockImages.push(assets.get('tai${i}')); 
    }
}