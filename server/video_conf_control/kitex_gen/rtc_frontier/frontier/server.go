// Code generated by Kitex v1.4.3. DO NOT EDIT.

package frontier

import (
	"github.com/volcengine/VolcEngineRTC/server/video_conf_control/kitex_gen/rtc_frontier"
)

// NewServer creates a server.Server with the given handler and options.
func NewServer(handler rtc_frontier.Frontier, opts ...server.Option) server.Server {
	var options []server.Option
	options = append(options, byted.ServerSuite(serviceInfo()))
	options = append(options, opts...)

	svr := server.NewServer(options...)
	if err := svr.RegisterService(serviceInfo(), handler); err != nil {
		panic(err)
	}
	return svr
}

// NewServerWithBytedConfig creates a server.Server with the given handler and options.
func NewServerWithBytedConfig(handler rtc_frontier.Frontier, config *byted.ServerConfig, opts ...server.Option) server.Server {
	var options []server.Option
	options = append(options, byted.ServerSuiteWithConfig(serviceInfo(), config))
	options = append(options, opts...)

	svr := server.NewServer(options...)
	if err := svr.RegisterService(serviceInfo(), handler); err != nil {
		panic(err)
	}
	return svr
}
