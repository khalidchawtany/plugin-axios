import Context from './common/context';
import Action from './actions/Action'
import Fetch from './actions/Fetch'
import Get from './actions/Get'
import Create from './actions/Create'
import Update from './actions/Update'
import Delete from './actions/Delete'

export default class VuexOrmAxios {
  /**
   * @constructor
   * @param {Components} components The Vuex-ORM Components collection
   * @param {Options} options The options passed to VuexORM.install
   */
  constructor(components, options) {
    Context.setup(components, options);
    this.setupActions();
    this.setupModels();
  }

  /**
   * This method will setup following Vuex actions: $fetch, $get, $create, $update, $delete
   */
  setupActions () {
    const context = Context.getInstance();

    context.components.Actions.$fetch = Fetch.call.bind(Fetch);
    context.components.Actions.$get = Get.call.bind(Get);
    context.components.Actions.$create = Create.call.bind(Create);
    context.components.Actions.$update = Update.call.bind(Update);
    context.components.Actions.$delete = Delete.call.bind(Delete);
  }

  /**
   * This method will setup following model methods: Model.$fetch, Model.$get, Model.$create,
   * Model.$update, Model.$delete
   */
  setupModels () {
    const context = Context.getInstance();

    /**
     * Transform Model and Modules
     */
    _.map(context.database.entities, entity => {
      entity.module = Action.transformModule(entity.module);
      entity.model = Action.transformModel(entity.model);
      return entity;
    });

    context.components.Model.$fetch = async function (config = {}) {
      return this.dispatch('$fetch', config);
    };

    context.components.Model.$get = async function (config = {}) {
      return this.dispatch('$get', config);
    };

    context.components.Model.$create = async function (config = {}) {
      return this.dispatch('$create', config);
    };

    context.components.Model.$update = async function (config = {}) {
      return this.dispatch('$update', config);
    };

    context.components.Model.$delete = async function (config = {}) {
      return this.dispatch('$delete', config);
    };
  }
}
