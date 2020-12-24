<template>
  <div class="box">
    <div class="bg-white p-10 flex items-center justify-center sm:justify-start text-center sm:text-left">
      <div v-if="isAllServicesUp" class="status-bubble big up"></div>
      <div v-else-if="isAllServicesDown" class="status-bubble big down"></div>
      <div v-else class="status-bubble big disruption"></div>
      <div class="flex flex-col">
        <div v-if="isAllServicesUp" class="text-2xl mb-1">
          All services are
          <span class="text-green-500">online</span>
        </div>
        <p v-else-if="isAllServicesDown" class="text-2xl mb-1">
          Service
          <span class="text-red-500">outage</span>
        </p>
        <p v-else class="text-2xl mb-1">
          Service
          <span class="text-orange-500">disruption</span>
        </p>
        <p v-if="isAllServicesUp" class="text-sm text-gray-600">Our infrastructure is up and running.<a class="text-blue-500 hover:text-blue-600 ml-2" target="blank" href="https://breezometer.com/contact-us">Experiencing an issue?</a></p>
        <p v-else-if="isAllServicesDown" class="text-sm text-gray-600">Our infrastructure is suffer outage.</p>
        <p v-else class="text-sm text-gray-600">Our infrastructure is suffer disruption.</p>
      </div>
    </div>
    <div class="bg-gray-200 p-10">
      <div v-for="(api, i) in apis" :key="api.name" class="border-t border-l border-r border-gray-500 p-5 text-gray-900 font-medium text-base flex justify-between items-center" :class="{ 'border-b': i === apis.length - 1 }">
        <p class="text-ellipsis">{{ api.name }}</p>
        <div class="flex items-center">
          <div class="status-bubble small" :class="[api.status === 1 ? 'up' : 'down']"></div>
          <p class="text-sm font-normal" :class="[api.status === 1 ? 'text-green-500' : 'text-red-500']">
            {{ api.status === 1 ? "Operational" : "Degraded" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      interval: null
    };
  },
  async mounted() {
    this.interval = setInterval(async () => {
      await this.getStatuses();
    }, 1000 * 60); /* Minute */
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    ...mapGetters({
      isAllServicesUp: "isAllServicesUp",
      isAllServicesDown: "isAllServicesDown"
    }),
    apis() {
      return this.$store.state.apis;
    }
  },
  methods: {
    async getStatuses() {
      for (const api of this.apis) {
        try {
          const { data } = await this.$axios.get(api.path, {
            params: {
              ...api.params,
              key: this.$store.state.apiKey,
              lat: this.$store.state.lat,
              lon: this.$store.state.lon
            }
          });

          this.$store.commit("SET_STATUS", { id: api.id, status: 1 });
        } catch (error) {
          this.$store.commit("SET_STATUS", { id: api.id, status: 0 });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.text-ellipsis {
  text-overflow: ellipsis;
  @apply pr-4 overflow-hidden whitespace-no-wrap text-base text-gray-700;

  @screen sm {
    @apply pr-0;
  }
}

.box {
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  @apply rounded-md;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.status-bubble {
  @apply rounded-full;

  &.big {
    animation: blinker 3s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
    @apply h-6 w-6 mr-8 hidden;

    @screen sm {
      @apply block;
    }

    &.up {
      @apply bg-green-500;
    }

    &.disruption {
      @apply bg-orange-500;
    }

    &.down {
      @apply bg-red-500;
    }
  }

  &.small {
    @apply h-2 w-2 mr-2;

    &.up {
      @apply bg-green-500;
    }

    &.disruption {
      @apply bg-orange-500;
    }

    &.down {
      @apply bg-red-500;
    }
  }
}
</style>
