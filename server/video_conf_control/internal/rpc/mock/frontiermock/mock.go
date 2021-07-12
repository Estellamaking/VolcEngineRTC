// Code generated by MockGen. DO NOT EDIT.
// Source: github.com/volcengine/VolcEngineRTC/server/video_conf_control/kitex_gen/rtc_frontier/frontier (interfaces: Client)

// Package mock is a generated GoMock package.
package mock

import (
	context "context"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	rtc_frontier "github.com/volcengine/VolcEngineRTC/server/video_conf_control/kitex_gen/rtc_frontier"
)

// MockClient is a mock of Client interface
type MockClient struct {
	ctrl     *gomock.Controller
	recorder *MockClientMockRecorder
}

// MockClientMockRecorder is the mock recorder for MockClient
type MockClientMockRecorder struct {
	mock *MockClient
}

// NewMockClient creates a new mock instance
func NewMockClient(ctrl *gomock.Controller) *MockClient {
	mock := &MockClient{ctrl: ctrl}
	mock.recorder = &MockClientMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use
func (m *MockClient) EXPECT() *MockClientMockRecorder {
	return m.recorder
}

// BroadcastToClient mocks base method
func (m *MockClient) BroadcastToClient(arg0 context.Context, arg1 *rtc_frontier.TBroadCastParam, arg2 ...callopt.Option) (*rtc_frontier.TBroadCastResp, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "BroadcastToClient", varargs...)
	ret0, _ := ret[0].(*rtc_frontier.TBroadCastResp)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// BroadcastToClient indicates an expected call of BroadcastToClient
func (mr *MockClientMockRecorder) BroadcastToClient(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "BroadcastToClient", reflect.TypeOf((*MockClient)(nil).BroadcastToClient), varargs...)
}

// CloseClient mocks base method
func (m *MockClient) CloseClient(arg0 context.Context, arg1 *rtc_frontier.TCloseClientParam, arg2 ...callopt.Option) (*rtc_frontier.TCloseClientResp, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "CloseClient", varargs...)
	ret0, _ := ret[0].(*rtc_frontier.TCloseClientResp)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// CloseClient indicates an expected call of CloseClient
func (mr *MockClientMockRecorder) CloseClient(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "CloseClient", reflect.TypeOf((*MockClient)(nil).CloseClient), varargs...)
}

// PushToClient mocks base method
func (m *MockClient) PushToClient(arg0 context.Context, arg1 *rtc_frontier.TPushParam, arg2 ...callopt.Option) (*rtc_frontier.TPushResp, error) {
	m.ctrl.T.Helper()
	varargs := []interface{}{arg0, arg1}
	for _, a := range arg2 {
		varargs = append(varargs, a)
	}
	ret := m.ctrl.Call(m, "PushToClient", varargs...)
	ret0, _ := ret[0].(*rtc_frontier.TPushResp)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// PushToClient indicates an expected call of PushToClient
func (mr *MockClientMockRecorder) PushToClient(arg0, arg1 interface{}, arg2 ...interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	varargs := append([]interface{}{arg0, arg1}, arg2...)
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "PushToClient", reflect.TypeOf((*MockClient)(nil).PushToClient), varargs...)
}
