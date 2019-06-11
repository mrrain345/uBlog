<template>
	<div>
        <div class="container">
            <div class="row">
            
			    <div class="col-12">
                    <div class="row">
                        <div class="col-12">
                            <div id="title">{{ title }}</div>
                            <div id="date">{{ date }}</div>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 4px;">
                       <VueMarkdown class="markdown col-12 col-lg-6" :source="content">{{content}}</VueMarkdown>
                    </div>
                    <div class="row">
                    <div class="col-6"><span id="views">{{views}} views</span></div>
                     <div class="col-6">                            
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
import VueMarkdown from 'vue-markdown';
export default {
    name: 'ArticleBox',
    components: {
		VueMarkdown
	},
	data() {
        
		return {
            content: '# Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nPraesent luctus risus in urna blandit dapibus. Mauris metus dui, vestibulum vel justo lacinia, blandit faucibus erat. Maecenas congue molestie odio quis pharetra. Ut malesuada, mi vel tristique mattis, tellus nulla posuere risus, eget tincidunt neque arcu vel ex.\n* Praesent aliquet orci dui, eu accumsan lorem tincidunt in.\n* Sed laoreet justo condimentum felis posuere gravida aliquam congue sapien.\n* Morbi sagittis, velit et consequat pretium, nisl augue malesuada diam, a volutpat nunc ex non risus.',
            title: 'Lorem ipsum dolor sit amet',
            likes: 5,
            dislikes: 25,
            date: '25.12.2019 15:15',
            reaction: 0,
            views: 0
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
	#title{
       
        font-size: 40px;
        font-weight: bold;
    }
   #date{
        margin-left: 10px;
        font-size: 20px;
        color: #757575;
    }
    #views{
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
    .markdown {

		text-align: justify;
	}
</style>
