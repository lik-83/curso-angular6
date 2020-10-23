import {
    reducerDestinosViajes,
    DestinosViajesState,
    initializeDestinosViajesState,
    InitMyDataAction,
    NuevoDestinoAction,
    DestinoBorrarAction,
    VoteUpAction,
    VoteDownAction
  } from './destinos-viajes-state.model';
  import { DestinoViaje } from './destino-viaje.model';
  
  describe('reducerDestinosViajes', () => {
    it('should reduce init data', () => {
      const prevState: DestinosViajesState = initializeDestinosViajesState();
      const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);
      const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
      expect(newState.items.length).toEqual(2);
      expect(newState.items[0].nombre).toEqual('destino 1');
    });
  
    it('should reduce new item added', () => {
      const prevState: DestinosViajesState = initializeDestinosViajesState();
      const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona', 'url'));
      const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
      expect(newState.items.length).toEqual(1);
      expect(newState.items[0].nombre).toEqual('barcelona');
    });
    it('should reduce new item added and delete it', () => {
      const prevState: DestinosViajesState = initializeDestinosViajesState();
      const createAction: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona', 'url'));
      const createState: DestinosViajesState = reducerDestinosViajes(prevState, createAction);
      expect(createState.items.length).toEqual(1);

      const deleteAction: DestinoBorrarAction = new DestinoBorrarAction(new DestinoViaje('barcelona', 'url'));
      const deleteState: DestinosViajesState = reducerDestinosViajes(prevState, deleteAction);
      expect(deleteState.items.length).toEqual(0);
    });
    it('should reduce new item added and mark it as favorite', () => {
      const prevState: DestinosViajesState = initializeDestinosViajesState();
      const createAction: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barcelona', 'url'));
      const createState: DestinosViajesState = reducerDestinosViajes(prevState, createAction);
      expect(createState.items.length).toEqual(1);
      expect(createState.items[0].isSelected).toBeTruthy();
    });
    it('should reduce new item added vote up', () => {
      const destinoViaje: DestinoViaje = new DestinoViaje('barcelona', 'url');
      const prevState: DestinosViajesState = initializeDestinosViajesState();
      const createAction: NuevoDestinoAction = new NuevoDestinoAction(destinoViaje);
      const createState: DestinosViajesState = reducerDestinosViajes(prevState, createAction);
      expect(createState.items.length).toEqual(1);
      expect(createState.items[0].votes).toEqual(0);

      const voteUpAction: VoteUpAction = new VoteUpAction(destinoViaje);
      const voteUpState: DestinosViajesState = reducerDestinosViajes(createState, voteUpAction);
      expect(voteUpState.items.length).toEqual(1);
      expect(voteUpState.items[0].votes).toEqual(1);
    });
    it('should reduce new item added vote down', () => {
      const destinoViaje: DestinoViaje = new DestinoViaje('barcelona', 'url');
      const prevState: DestinosViajesState = initializeDestinosViajesState();
      const createAction: NuevoDestinoAction = new NuevoDestinoAction(destinoViaje);
      const createState: DestinosViajesState = reducerDestinosViajes(prevState, createAction);
      expect(createState.items.length).toEqual(1);
      expect(createState.items[0].votes).toEqual(0);

      const voteDownAction: VoteDownAction = new VoteDownAction(destinoViaje);
      const voteDownState: DestinosViajesState = reducerDestinosViajes(createState, voteDownAction);
      expect(voteDownState.items.length).toEqual(1);
      expect(voteDownState.items[0].votes).toEqual(-1);
    });
  });
  