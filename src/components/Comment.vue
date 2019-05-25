<template>
	<div>
        <div class="container">
            <div class="row">
                <div class="col-1">
                <img class="image" src="" alt="Generic placeholder image">
                </div>
			    <div class="col-11">
                    <div class="row">
                        <div class="col-12">
                            <span id="author">{{ author }}</span>
                            <span id="date">{{ date }}</span>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 4px;">
                        <div class="col-12" id="content">{{ content }}</div>
                    </div>
                    <div class="row">
                        <div class="col-10"></div>
                        <div class="col-2">                            
                            <span @click="clicked(2)">
                                <div class="reaction" :class="{ 'pressed-reaction': reaction==2 }">{{ dislikes }}</div>
                                <i class="material-icons" :class="{ 'pressed-reaction': reaction==2 }">thumb_down_alt</i>
                            </span>
                             <span @click="clicked(1)">                               
                                <div class="reaction" :class="{ 'pressed-reaction': reaction==1 }">{{ likes }}</div>
                                <i class="material-icons" :class="{ 'pressed-reaction': reaction==1 }">thumb_up_alt</i>
                            </span>
                        </div>
                    </div>
                </div>
		    </div>
            <div class="row" style="margin-top: 8px;">
                <div class="col-11">
                </div>                              
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: 'Comment',
	data() {
		return {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo mauris, facilisis ac magna nec, ultrices pretium risus. Vestibulum finibus nisi non aliquet sodales. Maecenas imperdiet volutpat turpis, sed viverra dui semper eget. Integer interdum porta odio, non scelerisque mauris consectetur non. Integer in porttitor sapien. Nunc convallis mauris eget semper dictum. Maecenas in mauris ac purus lacinia mattis sit amet nec sapien. Vivamus id dolor nec enim scelerisque fringilla eu at metus. Nullam pellentesque malesuada orci, egestas molestie ex porttitor sit amet. Vivamus semper nisi vel posuere vestibulum.',
            author: 'Twoja Matka',
            likes: 5,
            dislikes: 25,
            date: '25.12.2019 15:15',
            reaction: 0
		};
	},
	methods: {
		clicked(id){
            if(this.reaction===id){
                this.reaction=0;
            } else {
                this.reaction=id;
            }
            console.log(id);
        }
		
	}
}

</script>

<style scoped>
	#author{
        font-size: 20px;
        font-weight: bold;
    }
    #date{
        margin-left: 10px;
        font-size: 15px;
        color: #757575;
    }
    .reaction{
        color: #757575;
        margin: 0 4px;
        float: right;
        cursor: pointer;
        user-select: none;
        transition: all 0.1s;
    }
    .material-icons{
        color: #757575;
        display: block;
        float: right;
        cursor: pointer;
        user-select: none;
        transition: all 0.1s;
    }
    .pressed-reaction{
        color: #43A047;
    }
    .reaction:hover{
        color: #616161;
    }
    .material-icons:hover{
        color: #616161;
    }
    .pressed-reaction:hover{
        color: #388E3C;
    }
</style>
