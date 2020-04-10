<template>
	<div>
		<title>PreMiD - Report A Bug</title>
		<section class="rab">

            <div class="rab-container">
				<h1 class="section-header">Report A Bug</h1>
                <br>
			</div>

			<div class="rab-container">
				<h1 class="heading">Brief Overview</h1>
                <textarea type="text" class="breif" maxlength="50" v-model="Report.bug_brief" required/>
			</div>

            <div class="rab-container">
				<h1 class="heading">Description (Include steps to repeat)</h1>
                <textarea type="text" class="desc" maxlength="500" v-model="Report.bug_description" required/>
			</div>
                <br>
            <div class="rab-container">
                <button type="button" class="button" @click="addToDB">Report</button>
			</div>
		</section>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "RAB",
		auth: true,
		data() {
			return {
				contributors: [],
                display: false,
                Report : {bug_brief:'',bug_description:'',bug_status:'New',bug_date:new Date().valueOf(),bug_userName:'',bug_userId:'',token: ''}
			};
        },
        methods: {
            addToDB(){
				if(!this.$auth.user) return this.$router.push("/login");
				console.log(this.$auth.user)
                if (!this.Report.bug_brief || !this.Report.bug_description || !this.Report.bug_userId || !this.Report.bug_date) return this.$noty.error('More info required');
                let newReport = {
                    bug_brief: this.Report.bug_brief,
                    bug_description: this.Report.bug_description,
                    bug_status: this.Report.bug_status,
                    bug_date: this.Report.bug_date,
                    bug_userName: this.$auth.user.username+'#'+$auth.user.discriminator,
                    bug_userId: this.$auth.user.id,
                    token: this.$auth.$storage._state["_token.discord"]
                };
                console.log(newReport);
                axios.post(`${process.env.apiBase}/bugPost`, newReport)
                .then((response) => {
                    this.$noty.success('Bug Submitted');
                    this.$router.push("/");
                })
                .catch((error) => {
                    this.$noty.error(error);
                    console.log(error);
                })
            }
            
        },
        mounted(){
            if(!this.$auth) return this.$router.push("/login");
        },
		head() {
			return {
				title: "Report A Bug"
			};
		}
	};
</script>


<style lang="scss" scoped>
@import "../stylesheets/variables.scss";

.rab{
	.rab-container {
		padding-left: 25px;
		padding-right: 25px;
		padding-top: 25px;
		max-width: 1400px;
		margin: 0 auto;
	}
	textarea[type="text"].breif {
		height: 1.8rem;
		padding: 20 20;
		font-size: 14px;
		transition: all 300ms ease;
		border: none;
		background: lighten($background-secondary, 4%);
		color: lighten($background-secondary, 40%);
		line-height: 25px;
		font-weight: bold;
		width: 400px;
		border-radius: 8px;
		resize: none;
	}

	textarea[type="text"].desc {
		height: 150px;
		padding: 20 20;
		font-size: 14px;
		transition: all 300ms ease;
		border: none;
		background: lighten($background-secondary, 4%);
		color: lighten($background-secondary, 40%);
		line-height: 25px;
		font-weight: bold;
		width: 100%;
		border-radius: 10px;
		resize: none;

	
		&:focus {
			background: lighten($background-secondary, 7%);
			outline: none;
		}
	
		* {
			margin-left: -17.5rem;
		}
	
		&::placeholder {
			color: lighten($background-secondary, 45%);
		}
	}

	h1.section-header {
		text-align: center;
		font-weight: 800;
		font-size: 52px;
		letter-spacing: -1px;
		background: linear-gradient(30deg, $accent-primary, #b3aeff);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-shadow: none;

		&::after {
			transition: 0.15s opacity ease-out;
			position: absolute;
			content: "";
			background: rgba(114, 137, 218, 0.25) !important;
			width: 100%;
			height: 100%;
			display: inline-block;
			left: 0;
			margin-top: -15px;
			z-index: -1;
			opacity: 0;
		}
	}
	.button{
		padding: 0 50;
	}
}
</style>