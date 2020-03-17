<template>
  <div>
    <div class="dimention">
      <el-button @click="isMoving=true">set isMoving</el-button>
      <div class="control">
        <div class="control-item">
          x <el-slider :step="0.01" :min="0" :max="1" v-model="x"></el-slider>
        </div>
        <div class="control-item">
          y <el-slider :step="0.01" :min="0" :max="1" v-model="y" ></el-slider>
        </div>
        <div class="control-item">
          z <el-slider :step="0.01" :min="0" :max="1" v-model="z"></el-slider>
        </div>
        <div class="control-item">
          angle <el-slider :min="0" :max="360" v-model="angle" ></el-slider>
        </div>
      </div>
      <div class="box" :style="styleObj" :class="{moving: isMoving}">
        <div class="face front">front</div>
        <div class="face right">right</div>
        <div class="face left">left</div>
        <div class="face top">top</div>
        <div class="face bottom">bottom</div>
        <div class="face back">back</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Button, Slider,
} from 'element-ui';


export default {
  name: 'App',
  components: {
    ElButton: Button,
    ElSlider: Slider,
  },
  data() {
    return {
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
      isMoving: false,
    };
  },
  methods: {
  },
  created() {
  },
  computed: {
    styleObj() {
      return {
        transform: `rotate3d(${this.x}, ${this.y}, ${this.z}, ${this.angle}deg)`,
      };
    },
  },
};
</script>

<style lang="scss">
.dimention {
  background: burlywood;
  opacity: .6;
  height: 300px;
  padding: 15px;
  .control {
    display: flex;
    justify-content: space-between;
    .control-item {
      flex: auto 1 1;
      margin: 0 15px;
    }
  }
}
.moving {
  animation: move 5s infinite;
}
.box {
  position: relative;
  width: 100px;
  height: 100px;
  left: 100px;
  top: 90px;
  // perspective: 550px;
  transform-style: preserve-3d;
  .face {
    opacity: .5;
    color: #fff;
    font-size: 19px;
    background: chartreuse;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: visible;
  }
  .front {
    transform: rotateX(0deg);
  }
  .right {
    transform: translateX(50px) translateZ(-50px) rotateY(90deg);
    background: hotpink;
  }
  .left {
    transform: translateX(-50px) translateZ(-50px) rotateY(-90deg);
    background: sienna;
  }
  .top {
    transform: translateY(-50px) translateZ(-50px) rotateX(-90deg);
    background: aqua;
  }
  .bottom {
    transform: translateY(50px) translateZ(-50px) rotateX(90deg);
    background: teal;
  }
  .back {
    transform: translateZ(-100px);
    background: blueviolet;
  }
}
@keyframes move{
  0% {
    left: 100px;
  }
  50% {
    left: 600px;
  }
  100% {
    left: 100px;
  }
}
</style>
