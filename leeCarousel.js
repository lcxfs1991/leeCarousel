    
    var leeCarousel = {

        id: "carousal_wrap",  // div element id
        img: [],              // img array
        style: "default",     // slider style
        width: 800,           // div width
        height: 195,          // div minHeight
        speed: 1,             // speed of slider
        gap: 3000,            // waiter time between 2 images
        divNode: null,        // div of that id
        imgItemArr: [],       // image DOM

        init: function(config){

            for (x in config){

                this[x] = config[x];

            }

            this.divNode = document.getElementById(this.id);

            if (this.divNode != null && this.img != null){

                this.createNode();
                this.startSliding();

            }

        },

        // create DOM nodes
        createNode: function(){

            this.divNode.style.width = this.width+"px";
            this.divNode.style.minHeight = this.height+"px";
            this.divNode.style.position = "relative";
            this.divNode.style.margin = "0 auto";
            this.divNode.style.overflow = "hidden";

            for (var i = 0; i < this.img.length; i++){

                var node = document.createElement("div");
                node.className = "carousal_item";
                node.style.width = this.width+"px";
                node.style.position = "absolute";
                

                var imgItem = document.createElement("img");
                imgItem.id = "img"+i;
                imgItem.src = this.img[i];
                imgItem.style.width = this.width+"px";

                if (i == 0){
                    node.style.left = "0";
                }
                else {
                    node.style.left = this.width+"px";
                }

                node.appendChild(imgItem);
                this.imgItemArr.push(node);

                this.divNode.appendChild(node);

            }

        },

        // start sliding
        startSliding: function(){

            len = this.imgItemArr.length;

            var pointer = 0;
            var current = pointer;
            var next = ++pointer;
            var decreCurrent = -10;
            var decreNext = 790;
            var gapTime = this.width / this.speed + this.gap;
            var that = this;


            function startInterval(){

                   that.imgItemArr[current].style.left = decreCurrent+"px";
                   that.imgItemArr[next].style.left = decreNext+"px";

                   decreCurrent -= 10;
                   decreNext -= 10;

                   if (that.imgItemArr[current].style.left == "-"+that.width+"px"){

                        that.imgItemArr[current].style.left = that.width+"px";
                        that.imgItemArr[next].style.left = 0+"px";

                        decreCurrent = -10;
                        decreNext = 790;

                        if (pointer != len - 1){

                            current = pointer;
                            next = ++pointer;

                        }
                        else{

                            current = pointer;
                            next = 0;
                            pointer = 0;

                        }
                        //restart animation afte gapTime
                        setTimeout(startInterval, gapTime);

                        
                   }
                   else{

                        //repeat animation
                        setTimeout(startInterval, this.speed);
                   }


                }

                //first start of animation
                setTimeout(startInterval, gapTime);


        }


    }