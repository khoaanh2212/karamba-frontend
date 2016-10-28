// import {DealerHomeDispatchBinder} from 'dealers/DealerHome.bindings';
//
// describe('[unit] DealerHome.bindings', function () {
//     it('onDealerRegistration', function () {
//         const register = sinon.stub(() => {
//             Promise.resolve('bar');
//         });
//         const dispatch = sinon.spy();
//         const sut = DealerHomeDispatchBinder(register)(dispatch);
//         const pendingDealerApplication = {
//             algo: "algo"
//         };
//         sut.onDealerRegistration(pendingDealerApplication);
//         sinon.assert.calledExactlyWith(register, pendingDealerApplication);
//         sinon.assert.calledExactlyWith(dispatcher);
//     });
// });